import { useRouter } from "next/router";

const Navbar = () => {
    const router = useRouter()
    return (
        <nav className="bg-gray-800 p-4">
            <a onClick={() => router.push("/")}>
                <div className="container mx-auto text-center text-white font-bold text-xl">
                    <span className="cursor-pointer">Questions - Bliss Applications</span>
                </div>
            </a>
        </nav>
    );
};

export default Navbar;
