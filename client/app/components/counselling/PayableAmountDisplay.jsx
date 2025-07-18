const PayableAmountDisplay = ({ amount }) => {
  return (
    <div className="md:col-span-2 my-4 text-blue-900 text-lg font-semibold">
      Payable Amount: ₹<span className="text-blue-700">{amount}</span>
    </div>
  );
};

export default PayableAmountDisplay;