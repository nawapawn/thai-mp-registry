import { useState, useMemo, memo, useCallback } from "react";
import MemberCard from "./MemberCard";
import type { Member } from "../types/member";
import "../index.css";

interface MemberListProps {
  members: Member[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const MemberList = memo(function MemberList({ members, onEdit, onDelete }: MemberListProps) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter members based on search
  const filteredMembers = useMemo(() => {
    if (!search) return members;

    const lowercasedSearch = search.toLowerCase();
    return members.filter(
      (m) =>
        `${m.title} ${m.firstName} ${m.lastName}`.toLowerCase().includes(lowercasedSearch) ||
        m.politicalParty?.toLowerCase().includes(lowercasedSearch) ||
        m.province?.toLowerCase().includes(lowercasedSearch)
    );
  }, [members, search]);

  // Remove duplicates
  const uniqueFilteredMembers = useMemo(() => {
    const map = new Map<string, Member>();
    filteredMembers.forEach((m) => {
      const key = m.mpId ?? `${m.firstName} ${m.lastName}`;
      if (!map.has(key)) map.set(key, m);
    });
    return Array.from(map.values());
  }, [filteredMembers]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(uniqueFilteredMembers.length / itemsPerPage));
  const paginatedMembers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return uniqueFilteredMembers.slice(startIndex, startIndex + itemsPerPage);
  }, [uniqueFilteredMembers, currentPage, itemsPerPage]);

  const handlePrev = useCallback(() => setCurrentPage((p) => Math.max(1, p - 1)), []);
  const handleNext = useCallback(() => setCurrentPage((p) => Math.min(totalPages, p + 1)), [totalPages]);

  return (
    <div className="bg-gray-50 p-6 rounded-2xl shadow-lg space-y-6 border border-gray-200">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h3 className="text-2xl font-bold text-gray-800">
          รายชื่อสมาชิกทั้งหมด ({uniqueFilteredMembers.length})
        </h3>
        <input
          type="text"
          placeholder="ค้นหาสมาชิก..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-auto px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      {paginatedMembers.length === 0 ? (
        <div className="text-center text-gray-500 py-10">ไม่พบสมาชิกที่ตรงกับคำค้นหา</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
          {paginatedMembers.map((m) => (
            <MemberCard key={m.id} member={m} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-3 mt-6">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition"
          >
            ← ก่อนหน้า
          </button>
          <span className="text-gray-600 font-semibold">หน้า {currentPage} จาก {totalPages}</span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition"
          >
            ถัดไป →
          </button>
        </div>
      )}
    </div>
  );
});

export default MemberList;
