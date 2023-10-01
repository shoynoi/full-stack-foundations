import { Link, Outlet } from '@remix-run/react'

export default function NotesRoute() {
	return (
		<div className="flex h-full justify-between pb-12 border-8 border-blue-500">
			<div>
				<h1 className="text-h1">Notes</h1>
				<ul>
					<li>
						<Link to=".." relative="path" className="underline">
							Back to Kody
						</Link>
					</li>
					<li>
						<Link to="some-note-id" className="underline">
							Some Note
						</Link>
					</li>
				</ul>
			</div>
			<Outlet />
		</div>
	)
}
