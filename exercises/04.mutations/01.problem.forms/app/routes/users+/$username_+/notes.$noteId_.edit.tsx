import { json, type DataFunctionArgs } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import { Button } from 'exercises__sep__03.loading__sep__02.problem.missing-data/app/components/ui/button.tsx'
import { floatingToolbarClassName } from '#app/components/floating-toolbar.tsx'
import { Input } from '#app/components/ui/input.tsx'
import { Label } from '#app/components/ui/label.tsx'
import { Textarea } from '#app/components/ui/textarea.tsx'
import { db } from '#app/utils/db.server.ts'
import { invariantResponse } from '#app/utils/misc.ts'

export async function loader({ params }: DataFunctionArgs) {
	const note = db.note.findFirst({
		where: {
			id: {
				equals: params.noteId,
			},
		},
	})

	invariantResponse(note, 'Note not found', { status: 404 })

	return json({
		note: { title: note.title, content: note.content },
	})
}

export default function NoteEdit() {
	const data = useLoaderData<typeof loader>()

	return (
		<Form
			method="post"
			className="flex h-full flex-col gap-y-4 overflow-x-hidden px-10 pb-28 pt-12"
		>
			<div>
				<Label>
					Title:
					<Input name="title" defaultValue={data.note.title} />
				</Label>
			</div>
			<div>
				<Label>
					Content:
					<Textarea name="content" defaultValue={data.note.content} />
				</Label>
			</div>
			<div className={floatingToolbarClassName}>
				<Button type="reset" variant="destructive">
					Reset
				</Button>
				<Button type="submit">Submit</Button>
			</div>
		</Form>
	)
}
