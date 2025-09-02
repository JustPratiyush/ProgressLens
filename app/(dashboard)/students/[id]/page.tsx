import StudentProfileClient from "./page.client";

export default async function StudentProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <StudentProfileClient id={id} />;
}
