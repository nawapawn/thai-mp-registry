import { type Member } from '../types/member';

interface MemberCardProps {
  member: Member;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function MemberCard({ member, onEdit, onDelete }: MemberCardProps) {
  const renderPhoto = (photoUrl?: string, alt: string = 'รูปถ่าย') => {
    if (photoUrl) {
      return (
        <img 
          src={photoUrl} 
          alt={alt} 
          className="w-24 h-24 object-cover rounded-lg border-2 border-gray-200 shadow-sm"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            target.nextElementSibling?.classList.remove('hidden');
          }}
        />
      );
    }
    return (
      <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg border-2 border-gray-200 flex items-center justify-center text-xs text-gray-500">
        <div className="text-center">
          <svg className="w-6 h-6 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span>ไม่มีรูป</span>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start space-x-4">
          {/* รูปถ่าย */}
          <div className="flex space-x-2">
            {renderPhoto(member.photo1, 'รูปถ่าย 1')}
            {renderPhoto(member.photo2, 'รูปถ่าย 2')}
          </div>

          {/* ข้อมูลหลัก */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {member.title} {member.firstName} {member.lastName}
                </h3>
                
                <div className="flex items-center space-x-4 mb-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    {member.politicalParty}
                  </span>

                  {member.province && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {member.province}
                    </span>
                  )}

                  {member.ministerPosition && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
                      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {member.ministerPosition}
                    </span>
                  )}
                </div>

                {member.ministry && (
                  <p className="text-sm text-amber-700 font-medium mb-3">
                    กระทรวง: {member.ministry}
                  </p>
                )}

                {/* ประวัติการทำงาน */}
                {member.workHistory && (
                  <div className="mb-3">
                    <h4 className="text-sm font-semibold text-gray-700 mb-1">ประวัติการทำงาน:</h4>
                    <p className="text-sm text-gray-600 line-clamp-2">{member.workHistory}</p>
                  </div>
                )}

                {/* ผลงานที่ผ่านมา */}
                {member.achievements && (
                  <div className="mb-3">
                    <h4 className="text-sm font-semibold text-gray-700 mb-1">ผลงานที่ผ่านมา:</h4>
                    <p className="text-sm text-gray-600 line-clamp-2">{member.achievements}</p>
                  </div>
                )}
              </div>

              {/* ปุ่มจัดการ */}
              <div className="flex space-x-2 ml-4">
                {member.profileUrl && (
                  <a
                    href={member.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    โปรไฟล์
                  </a>
                )}
                <button
                  onClick={() => onEdit(member.id!)}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  แก้ไข
                </button>
                <button
                  onClick={() => onDelete(member.id!)}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  ลบ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
