// src/utils/dataLoader.ts
import { type Member } from '../types/member';
import mpsData from '../data/mpsData.json';

// Type for JSON data from the source file
interface MpData {
  profileUrl: string;
  img: string;
  id: string;
  name: string;
  party: string;
  province: string | null;
  type: string;
}

// Function to parse name and surname from full name
function parseName(fullName: string): { title: string; firstName: string; lastName: string } {
  const titles = ['นาย', 'นาง', 'นางสาว', 'ศาสตราจารย์', 'รองศาสตราจารย์', 'ผู้ช่วยศาสตราจารย์', 'ดร.', 'ศ.ดร.', 'รศ.ดร.', 'ผศ.ดร.'];

  let title = '';
  let remainingName = fullName;

  // Find title
  for (const t of titles) {
    if (fullName.startsWith(t)) {
      title = t;
      remainingName = fullName.substring(t.length).trim();
      break;
    }
  }

  // Split name and surname
  const nameParts = remainingName.split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  return { title, firstName, lastName };
}

// Convert JSON data to Member format for the system
export function convertMpDataToMember(mpData: MpData): Member {
  try {
    const { title, firstName, lastName } = parseName(mpData.name);

    return {
      id: Date.now() + Math.random(),
      title,
      firstName,
      lastName,
      photo1: mpData.img,
      photo2: '',
      workHistory: `สมาชิกสภาผู้แทนราษฎร ${mpData.province || 'ไม่ระบุจังหวัด'} ${mpData.type}`,
      achievements: 'ข้อมูลผลงานจะต้องกรอกเพิ่มเติม',
      ministerPosition: '',
      ministry: '',
      politicalParty: mpData.party,
      province: mpData.province || undefined,
      profileUrl: mpData.profileUrl,
      mpId: mpData.id,
    };
  } catch (error) {
    console.error('Error converting MP data:', error, mpData);
    throw new Error(`Failed to convert MP data for ${mpData.name}`);
  }
}

// Load all data from JSON
export function loadAllMpsData(): Member[] {
  try {
    if (!Array.isArray(mpsData)) {
      throw new Error('Invalid data format: expected array');
    }
    return mpsData.map(convertMpDataToMember);
  } catch (error) {
    console.error('Error loading all MPs data:', error);
    throw new Error('Failed to load MPs data');
  }
}

// Load partial data (e.g., for testing)
export function loadSampleMpsData(count: number = 10): Member[] {
  try {
    if (!Array.isArray(mpsData)) {
      throw new Error('Invalid data format: expected array');
    }
    if (count < 0 || count > mpsData.length) {
      throw new Error(`Invalid count: must be between 0 and ${mpsData.length}`);
    }
    return mpsData.slice(0, count).map(convertMpDataToMember);
  } catch (error) {
    console.error('Error loading sample MPs data:', error);
    throw new Error('Failed to load sample MPs data');
  }
}