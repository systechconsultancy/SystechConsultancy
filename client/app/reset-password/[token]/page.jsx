import ResetPasswordClient from "./ResetPasswordClient.jsx";

export const metadata = {
    title: "Reset Your Password",
    robots: {
        index: false,
        follow: false,
    },
};

// This Server Component passes the token from the URL to the Client Component
export default async function ResetPasswordPage(props) {
    const params = await props.params;
    const token = params.token;
    return <ResetPasswordClient token={token} params={params} />;
}