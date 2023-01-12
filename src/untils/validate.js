const validate = (payload, setInvalidFields) => {
    let invalid = 0;
    let fields = Object.entries(payload);

    let valid = [];
    fields.forEach((field) => {
        if (field[1] === "" || field[1] === 0) {
            valid.push({
                name: field[0],
                message: "Bạn không được bỏ trường này",
            });
            // setInvalidFields((prev) => [
            //     ...prev,
            //     {
            //         name: field[0],
            //         message: "Bạn không được bỏ trường này",
            //     },
            // ]);
            invalid++;
        }
    });

    fields.forEach((field) => {
        switch (field[0]) {
            case "password":
                if (field[1].length < 6) {
                    valid.push({ name: field[0], message: "Mật khẩu tối thiểu 6 kí tự" });
                    // setInvalidFields((prev) => [
                    //     ...prev,
                    //     { name: field[0], message: "Mật khẩu tối thiểu 6 kí tự" },
                    // ]);
                    invalid++;
                }
                break;
            case "phone":
                if (!+field[1]) {
                    valid.push({ name: field[0], message: "Số điện thoại không hợp lệ" });
                    // setInvalidFields((prev) => [
                    //     ...prev,
                    //     { name: field[0], message: "Số điện thoại không hợp lệ" },
                    // ]);
                    invalid++;
                }
                break;
            case "priceNumber":
                if (!isFinite(+field[1]) || isNaN(+field[1])) {
                    valid.push({
                        name: field[0],
                        message: "Yếu cầu là số",
                    });
                } else if (+field[1] < Math.pow(10, 5)) {
                    valid.push({
                        name: field[0],
                        message: "Giá tối thiểu là 100000 nghìn đồng",
                    });
                }
                break;
            case "areaNumber":
                if (!isFinite(+field[1]) || isNaN(+field[1])) {
                    valid.push({
                        name: field[0],
                        message: "Yêu cầu nhập số",
                    });
                } else if (+field[1] < 10) {
                    valid.push({
                        name: field[0],
                        message: "Diện tích tối thiểu là 10m2",
                    });
                }
                break;
            default:
                break;
        }
    });

    setInvalidFields(valid);
    return invalid;
};

export default validate;
