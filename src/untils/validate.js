const validate = (payload, setInvalidFields) => {
    let invalid = 0;
    let fields = Object.entries(payload);

    fields.forEach((field) => {
        if (field[1] === "") {
            setInvalidFields((prev) => [
                ...prev,
                {
                    name: field[0],
                    message: "Bạn không được bỏ trường này",
                },
            ]);
            invalid++;
        }
    });

    fields.forEach((field) => {
        switch (field[0]) {
            case "password":
                if (field[1].length < 6) {
                    setInvalidFields((prev) => [
                        ...prev,
                        { name: field[0], message: "Mật khẩu tối thiểu 6 kí tự" },
                    ]);
                    invalid++;
                }
                break;
            case "phone":
                if (!+field[1]) {
                    setInvalidFields((prev) => [
                        ...prev,
                        { name: field[0], message: "Số điện thoại không hợp lệ" },
                    ]);
                    invalid++;
                }
                break;
            default:
                break;
        }
    });
    return invalid;
};

export default validate;
