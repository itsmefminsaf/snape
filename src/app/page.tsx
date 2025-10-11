import { auth } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";

const HomePage = async () => {
	const session = await auth.getSession();
	return session ? (
		<>
			{session.user.picture && (
				<Image
					src={session.user.picture}
					alt="User profile"
					width={64}
					height={64}
				/>
			)}
			<h1>{session.user.name}</h1>
			<h1>{}</h1>
			<Link href="/auth/logout">Logout</Link>
		</>
	) : (
		<>
			<h1>Welcome to Snape</h1> <Link href="/auth/login">Login</Link>
		</>
	);
};

export default HomePage;
