import SignIn from '../../components/signin';

const Index = () => {
    const handleSignIn = ({username, password}) => {
        console.log(`Signing in to company connector as ${username}`);
    };

    return (
        <SignIn
            logoSrc="/logo.png"
            signInText="Company Sign In"
            onSubmit={handleSignIn}
        />
    );
};
export default Index;