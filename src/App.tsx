import { useState } from 'react';
import MemberForm from './component/MemberForm';
import MemberList from './component/MemberList';
import { type Member } from './types/member';
import { loadAllMpsData, loadSampleMpsData } from './utils/dataLoader';

export default function App() {
  const [members, setMembers] = useState<Member[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleAddOrEdit = (data: Member) => {
    if (editingId !== null) {
      setMembers(members.map(m => m.id === editingId ? { ...m, ...data } : m));
      setEditingId(null);
    } else {
      setMembers([...members, { ...data, id: Date.now() }]);
    }
  };

  const handleEdit = (id: number) => setEditingId(id);
  const handleDelete = (id: number) => setMembers(members.filter(m => m.id !== id));

  const handleImportSample = () => {
    const sampleData = loadSampleMpsData(20); // นำเข้าข้อมูล 20 คนแรก
    setMembers(prev => [...prev, ...sampleData]);
  };

  const handleImportAll = () => {
    const allData = loadAllMpsData();
    setMembers(allData);
  };

  const editingMember = members.find(m => m.id === editingId) || null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ทำเนียบรายชื่อสมาชิกสภาผู้แทนราษฎร
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            ระบบจัดการข้อมูลสมาชิกสภาผู้แทนราษฎรไทย
          </p>

          {/* Import Buttons */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleImportSample}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              นำเข้าข้อมูลตัวอย่าง (20 คน)
            </button>
            <button
              onClick={handleImportAll}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              นำเข้าข้อมูลทั้งหมด
            </button>
          </div>
        </div>

        {/* Form and List */}
        <div className="space-y-8">
          <MemberForm
            defaultValues={editingMember || undefined}
            onSubmit={handleAddOrEdit}
            cancelEdit={() => setEditingId(null)}
          />
          <MemberList
            members={members}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

        </div>
      </div>
    </div>
  );
}
