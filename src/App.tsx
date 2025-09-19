import { useState } from "react";
import MemberForm from "./component/MemberForm";
import MemberList from "./component/MemberList";
import { type Member } from "./types/member";
import { loadAllMpsData, loadSampleMpsData } from "./utils/dataLoader";
import "./index.css";

export default function App() {
  const [members, setMembers] = useState<Member[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleAddOrEdit = (data: Member) => {
    if (editingId !== null) {
      setMembers(members.map((m) => (m.id === editingId ? { ...m, ...data } : m)));
      setEditingId(null);
    } else {
      const exists = members.some(
        (m) =>
          (m.mpId && data.mpId && m.mpId === data.mpId) ||
          `${m.firstName} ${m.lastName}` === `${data.firstName} ${data.lastName}`
      );

      if (!exists) {
        setMembers([...members, { ...data, id: Date.now() + Math.random() }]);
      } else {
        alert(`สมาชิก "${data.title} ${data.firstName} ${data.lastName}" มีอยู่แล้ว!`);
      }
    }
  };

  const handleEdit = (id: number) => setEditingId(id);
  const handleDelete = (id: number) => setMembers(members.filter((m) => m.id !== id));

  const handleImportSample = () => {
    try {
      const newMembers = loadSampleMpsData(10);
      setMembers(deduplicateMembers(newMembers));
    } catch (error) {
      console.error(error);
      alert("เกิดข้อผิดพลาดในการนำเข้าข้อมูลตัวอย่าง");
    }
  };

  const handleImportAll = () => {
    try {
      const newMembers = loadAllMpsData(); // สมมติ 300 คน
      setMembers(deduplicateMembers(newMembers));
    } catch (error) {
      console.error(error);
      alert("เกิดข้อผิดพลาดในการนำเข้าข้อมูลทั้งหมด");
    }
  };

  const deduplicateMembers = (memberArray: Member[]): Member[] => {
    const map = new Map<string, Member>();
    for (const m of memberArray) {
      const key = m.mpId ?? `${m.firstName} ${m.lastName}`;
      if (!map.has(key)) map.set(key, m);
    }
    return Array.from(map.values());
  };

  const editingMember = members.find((m) => m.id === editingId) || undefined;

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <div className="main-container space-y-10">
        <header className="text-center space-y-3">
          <h1 className="text-4xl font-bold text-gray-900 drop-shadow-[1px_1px_0_#fff]">
            ทำเนียบสมาชิกสภาผู้แทนราษฎร
          </h1>
          <p className="text-gray-700">ระบบจัดการข้อมูลสมาชิกสภาผู้แทนราษฎร</p>
          <div className="flex justify-center gap-4 mt-4">
            <button onClick={handleImportSample} className="btn-primary">
              นำเข้าข้อมูลตัวอย่าง
            </button>
            <button onClick={handleImportAll} className="btn-secondary">
              นำเข้าข้อมูลทั้งหมด
            </button>
          </div>
        </header>

        <MemberForm
          defaultValues={editingMember}
          onSubmit={handleAddOrEdit}
          onCancel={() => setEditingId(null)}
        />

        <MemberList members={members} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div>
  );
}
