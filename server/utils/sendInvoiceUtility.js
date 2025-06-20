import axios from 'axios';
import { getAccessToken } from './zohoTokenManager.js';



export const sendInvoice = async (name, email, phone, date) => {
  try {
    const ZOHO_BASE_URL = process.env.ZOHO_BASE_URL;
    const ORGANIZATION_ID = process.env.ZOHO_ORG_ID;
    const ZOHO_ITEM_ID = process.env.ZOHO_ITEM_ID;

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

    const invoicePayload = {
      customer_id: customerResponse.data.contact.contact_id,
      date: date,
      line_items: [
        {
          item_id: ZOHO_ITEM_ID,
          rate: 250,
          quantity: 1,
          description: 'A personalized 1-on-1 counselling session that provides a complete roadmap to pursue higher education in Germany. This session covers university types, eligibility, application timelines, documentation requirements, admission processes, and other benifits.',
        },
      ],
      "item_type": "services",
      notes: "Thank you for choosing Systech Consultancy for your strategic counselling session. We’re committed to delivering clarity and direction in your journey toward higher education in Germany. This session is your first step toward a well-informed future.",
      terms: "This invoice is issued post-payment and confirms your counselling session booking. No refunds apply. Please ensure your availability at the scheduled time. For rescheduling or queries, contact us at contact@systechconsultancy.in."
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


    await axios.post(`${ZOHO_BASE_URL}/invoices/${invoiceResponse.data.invoice.invoice_id}/status/sent`, null, {
      headers: {
        Authorization: `Zoho-oauthtoken ${access_token}`,
        'X-com-zoho-invoice-organizationid': ORGANIZATION_ID,
      }
    });

    const paymentPayload = {
      "customer_id": customerResponse.data.contact.contact_id,
      "payment_mode": "banktransfer",
      "amount": 250,
      "date": date,
      "description": "Paid via UPI. Payment received before invoice generation.",
      "invoices": [
        {
          "invoice_id": invoiceResponse.data.invoice.invoice_id,
          "amount_applied": 250
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
      "send_from_org_email_id": true,
      "to_mail_ids": [
        email
      ],
      email_template_id: "2623565000000000014"
    };

   await axios.post(
      `${ZOHO_BASE_URL}/invoices/${invoiceResponse.data.invoice.invoice_id}/email`,
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