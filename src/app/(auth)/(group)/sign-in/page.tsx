import Logo from 'shared/ui/logo'
import { Button } from 'ui/button'
import { SignInForm } from 'widgets/auth-form'

export default function SignIn() {
	return (
		<div className='px-5'>
			<header className='w-full min-w-[24rem] px-5 py-4 fixed left-0 top-0 flex items-center justify-between'>
				<Logo size='10' />

				<Button variant='outline'>Sign up</Button>
			</header>

			<div className='min-h-screen flex items-center justify-center'>
				<SignInForm />
			</div>
		</div>
	)
}
