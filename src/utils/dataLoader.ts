import { type Member } from '../types/member';
import mpsData from '../mps.json';

interface MpData {
  profileUrl: string;
  img: string;
  id: string;
  name: string;
  party: string;
  province: string | null;
  type: string;
}

// ฟังก์ชันแยกชื่อและนามสกุลจากชื่อเต็ม
function parseName(fullName: string): { title: string; firstName: string; lastName: string } {
  const titles = ['นาย', 'นาง', 'นางสาว', 'ศาสตราจารย์', 'รองศาสตราจารย์', 'ผู้ช่วยศาสตราจารย์', 'ดร.', 'ศ.ดร.', 'รศ.ดร.', 'ผศ.ดร.'];
  
  let title = '';
  let remainingName = fullName;
  
  // หาคำนำหน้า
  for (const t of titles) {
    if (fullName.startsWith(t)) {
      title = t;
      remainingName = fullName.substring(t.length).trim();
      break;
    }
  }
  
  // แยกชื่อและนามสกุล
  const nameParts = remainingName.split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';
  
  return { title, firstName, lastName };
}

// แปลงข้อมูลจาก JSON เป็น Member format
export function convertMpDataToMember(mpData: MpData): Member {
  const { title, firstName, lastName } = parseName(mpData.name);
  
  return {
    id: Date.now() + Math.random(), // สร้าง ID ใหม่
    title,
    firstName,
    lastName,
    photo1: mpData.img,
    photo2: '', // ไม่มีรูปที่ 2 ในข้อมูลต้นฉบับ
    workHistory: `สมาชิกสภาผู้แทนราษฎร ${mpData.province || 'ไม่ระบุจังหวัด'} ${mpData.type}`,
    achievements: 'ข้อมูลผลงานจะต้องกรอกเพิ่มเติม',
    ministerPosition: '', // ไม่มีข้อมูลในไฟล์ต้นฉบับ
    ministry: '', // ไม่มีข้อมูลในไฟล์ต้นฉบับ
    politicalParty: mpData.party,
    province: mpData.province || undefined,
    profileUrl: mpData.profileUrl,
    mpId: mpData.id,
  };
}

// โหลดข้อมูลทั้งหมดจาก JSON
export function loadAllMpsData(): Member[] {
  return mpsData.map(convertMpDataToMember);
}

// โหลดข้อมูลบางส่วน (สำหรับทดสอบ)
export function loadSampleMpsData(count: number = 10): Member[] {
  return mpsData.slice(0, count).map(convertMpDataToMember);
}
