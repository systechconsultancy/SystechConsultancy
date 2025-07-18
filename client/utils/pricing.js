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