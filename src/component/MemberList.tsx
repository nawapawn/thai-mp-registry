import { useState, useMemo } from 'react';
import MemberCard from './MemberCard';
import type { Member } from '../types/member';

interface MemberListProps {
  members: Member[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function MemberList({ members, onEdit, onDelete }: MemberListProps) {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter members by search
  const filteredMembers = useMemo(() => {
    return members.filter(m =>
      `${m.title} ${m.firstName} ${m.lastName}`.toLowerCase().includes(search.toLowerCase())
      || m.politicalParty?.toLowerCase().includes(search.toLowerCase())
      || m.province?.toLowerCase().includes(search.toLowerCase())
    );
  }, [members, search]);

  // Pagination
  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const paginatedMembers = filteredMembers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrev = () => setCurrentPage(p => Math.max(1, p - 1));
  const handleNext = () => setCurrentPage(p => Math.min(totalPages, p + 1));

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="flex justify-end">
        <input
          type="text"
          placeholder="ค้นหาสมาชิก..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
          className="px-3 py-2 border rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* List */}
      {paginatedMembers.length === 0 ? (
        <div className='bg-white shadow rounded-lg p-6 text-center text-gray-500'>
          ไม่มีสมาชิกตรงกับคำค้นหา
        </div>
      ) : (
        <div className='grid gap-4'>
          {paginatedMembers.map(m => (
            <MemberCard key={m.id} member={m} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </div>
      )}

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-4">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded-md disabled:opacity-50"
          >
            ก่อนหน้า
          </button>
          <span>{currentPage} / {totalPages}</span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded-md disabled:opacity-50"
          >
            ถัดไป
          </button>
        </div>
      )}
    </div>
  );
}
