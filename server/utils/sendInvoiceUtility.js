import axios from 'axios';
import { getAccessToken } from './zohoTokenManager.js';


const getInvoiceLineItem = (type, amount) => {
  const item_id =
    type === "individual"
      ? process.env.ZOHO_IND_ITEM_ID
      : process.env.ZOHO_GRP_ITEM_ID;

  return {
    item_id,
    rate: amount,
    quantity: 1,
  };
};


export const sendInvoice = async (name, email, phone, date, type = "individual", amount = 250) => {
  try {
    const ZOHO_BASE_URL = process.env.ZOHO_BASE_URL;
    const ORGANIZATION_ID = process.env.ZOHO_ORG_ID;
    const access_token = await getAccessToken();

    const contactPayload = {
      contact_name: name,
      contact_persons: [
        {
          first_name: name,
          email,
          phone,
          is_primary_contact: true
        },
      ],
    };

    const customerResponse = await axios.post(
      `${ZOHO_BASE_URL}/contacts`,
      contactPayload,
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${access_token}`,
          'X-com-zoho-invoice-organizationid': ORGANIZATION_ID,
        }
      }
    );

    const customerId = customerResponse.data.contact.contact_id;

    const invoicePayload = {
      customer_id: customerId,
      date,
      line_items: [getInvoiceLineItem(type, amount)],
      "item_type": "services",
      notes: "Thank you for choosing Systech Consultancy for your strategic counselling session. We’re committed to delivering clarity and direction in your journey toward higher education in Germany. This session is your first step toward a well-informed future.",
      terms: "This invoice is issued post-payment and confirms your counselling session booking. No refunds apply. Please ensure your availability at the scheduled time."
    };

    const invoiceResponse = await axios.post(
      `${ZOHO_BASE_URL}/invoices`,
      invoicePayload,
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${access_token}`,
          'X-com-zoho-invoice-organizationid': ORGANIZATION_ID,
        }
      }
    );

    const invoiceId = invoiceResponse.data.invoice.invoice_id;

    await axios.post(`${ZOHO_BASE_URL}/invoices/${invoiceId}/status/sent`, null, {
      headers: {
        Authorization: `Zoho-oauthtoken ${access_token}`,
        'X-com-zoho-invoice-organizationid': ORGANIZATION_ID,
      }
    });

    const paymentPayload = {
      customer_id: customerId,
      payment_mode: "banktransfer",
      amount,
      date,
      description: "Paid via UPI. Payment received before invoice generation.",
      invoices: [
        {
          invoice_id: invoiceId,
          amount_applied: amount,
        }
      ]
    }

    await axios.post(`${ZOHO_BASE_URL}/customerpayments`, paymentPayload, {
      headers: {
        Authorization: `Zoho-oauthtoken ${access_token}`,
        'X-com-zoho-invoice-organizationid': ORGANIZATION_ID,
      },
    });

    const emailPayload = {
      send_from_org_email_id: true,
      to_mail_ids: [email],
      email_template_id: "2623565000000000014"
    };

   await axios.post(
      `${ZOHO_BASE_URL}/invoices/${invoiceId}/email`,
      emailPayload,
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${access_token}`,
          'X-com-zoho-invoice-organizationid': ORGANIZATION_ID,
        }
      }
    );


  } catch (error) {
    console.error('Invoice Sending Error:', error);
  }
};