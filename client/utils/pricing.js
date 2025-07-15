const calculatePayableAmount = (type, noOfStudents = 1) => {
    if (type === "individual") return 250;

    switch (noOfStudents) {
        case 2: return 175 * 2;
        case 3: return 160 * 3;
        case 4: return 150 * 4;
        case 5: return 140 * 5;
        default: return 0;
    }
};

export { calculatePayableAmount };

// const calculateDiscountedAmount = (type, noOfStudents = 1) => {
//     if (type === "individual") return 250;

//     switch (noOfStudents) {
//         case 2: return 175 * 2 * 0.9; // 10% discount
//         case 3: return 160 * 3 * 0.85; // 15% discount
//         case 4: return 150 * 4 * 0.8; // 20% discount
//         case 5: return 140 * 5 * 0.75; // 25% discount
//         default: return 0;
//     }
// };

// export default calculateDiscountedAmount;