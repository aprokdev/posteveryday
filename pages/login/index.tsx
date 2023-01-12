export default function LoginPage(): JSX.Element {
    return (
        <div className="bg-blue-100 min-h">
            <div className="flex items-center justify-center min-h">
                <form className="w-96 bg-fuchsia-100 rounded-lg p-8 shadow-lg grid grid-cols-1 gap-6">
                    <label className="block">
                        <span className="text-gray-700">Email</span>
                        <input
                            type="email"
                            className="
                                py-2
                                px-3
                                mt-1
                                block
                                w-full
                                rounded-md
                                bg-gray-100
                                border-transparent
                                focus:border-gray-500 focus:bg-white focus:ring-0
                                border-indigo-600
                                border-2
                            "
                            placeholder=""
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">First name</span>
                        <input
                            type="text"
                            className="
                                py-2
                                px-3
                                mt-1
                                block
                                w-full
                                rounded-md
                                bg-gray-100
                                border-transparent
                                focus:border-gray-500 focus:bg-white focus:ring-0
                                border-indigo-600
                                border-2
                            "
                            placeholder=""
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Last name</span>
                        <input
                            type="text"
                            className="
                                py-2
                                px-3
                                mt-1
                                block
                                w-full
                                rounded-md
                                bg-gray-100
                                border-transparent
                                focus:border-gray-500 focus:bg-white focus:ring-0
                                border-indigo-600
                                border-2
                            "
                            placeholder=""
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Password</span>
                        <input
                            type="password"
                            className="
                                py-2
                                px-3
                                mt-1
                                block
                                w-full
                                rounded-md
                                bg-gray-100
                                border-transparent
                                focus:border-gray-500 focus:bg-white focus:ring-0
                                border-indigo-600
                                border-2
                            "
                            placeholder=""
                        />
                    </label>
                    <div className="flex justify-end">
                        <div className="inline-block cursor-pointer mt-8 rounded-md bg-indigo-600 py-2 px-3 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500">
                            Register
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
