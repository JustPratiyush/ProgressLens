import StudentProfileClient from "./page.client"

export default function StudentProfilePage({ params }: { params: { id: string } }) {
  return <StudentProfileClient id={params.id} />
}
