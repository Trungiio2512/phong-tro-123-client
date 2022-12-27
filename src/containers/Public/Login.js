import { InputForm, Button } from "../../components";

function Login() {
    return (
        <div className="bg-white w-full max-w-600 pt-[30px] px-[30px] pb-[100px] rounded-md border-1 border-stone-300">
            <h1 className="font-semibold text-3xl">Đăng nhập</h1>
            <div className="w-full flex flex-col mt-5">
                <InputForm label="số điện thoại" />
                <InputForm label="mật khẩu" />
            </div>
            <div className="mt-5">
                <Button
                    text={"Đăng nhập"}
                    textColor="text-white"
                    bgColor={"bg-secondary1"}
                    fullWidth
                />
            </div>
            <div className="w-full flex items-center justify-between mt-[30px]">
                <small className="text-sm text-blue-500 hover:text-red-500 cursor-pointer">
                    Bạn quên mật khẩu
                </small>
                <small className="text-sm text-blue-500 hover:text-red-500 cursor-pointer">
                    Tạo tài khoản mới
                </small>
            </div>
        </div>
    );
}

export default Login;
