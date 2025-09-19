import { useState, memo, useMemo } from "react";
import { type Member } from "../types/member";
import "../index.css";

interface MemberCardProps {
  member: Member;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const achievementsPool = [
  "ริเริ่มโครงการพัฒนาชุมชนแบบยั่งยืน",
  "ได้รับรางวัลนักการเมืองดีเด่นแห่งปี",
  "ผลักดันนโยบายด้านการศึกษา",
  "ปรับปรุงระบบสาธารณูปโภคในจังหวัด",
  "สร้างโครงการส่งเสริมเยาวชน",
  "พัฒนาสาธารณสุขชุมชนอย่างยั่งยืน",
  "ริเริ่มนวัตกรรมการบริหารงานรัฐ",
  "สนับสนุนกิจกรรมกีฬาเยาวชน",
  "ผลักดันการท่องเที่ยวเชิงวัฒนธรรม",
  "ทำงานร่วมกับองค์กรระหว่างประเทศเพื่อพัฒนาโครงการสังคม"
];

const positionsPool = [
  { position: "รัฐมนตรีว่าการ", ministry: "กระทรวงการคลัง" },
  { position: "รัฐมนตรีช่วย", ministry: "กระทรวงศึกษาธิการ" },
  { position: "รัฐมนตรีช่วย", ministry: "กระทรวงสาธารณสุข" },
  { position: "รัฐมนตรีว่าการ", ministry: "กระทรวงคมนาคม" },
  { position: "รัฐมนตรีช่วย", ministry: "กระทรวงแรงงาน" },
];

const MemberCard = memo(function MemberCard({ member, onEdit, onDelete }: MemberCardProps) {
  const [isImageError1, setIsImageError1] = useState(false);
  const [isImageError2, setIsImageError2] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const randomAchievements = useMemo(() => {
    const usedIndexes = new Set<number>();
    const shuffled: string[] = [];
    while (shuffled.length < 2) {
      const idx = Math.floor(Math.random() * achievementsPool.length);
      if (!usedIndexes.has(idx)) {
        usedIndexes.add(idx);
        shuffled.push(achievementsPool[idx]);
      }
    }
    return shuffled.join(", ");
  }, []);

  const randomPosition = useMemo(() => {
    if (member.firstName === "อนุทิน" && member.lastName === "ชาญวีรกูล") {
      return { position: "นายก", ministry: "รัฐบาล" };
    }
    const idx = Math.floor(Math.random() * positionsPool.length);
    return positionsPool[idx];
  }, [member.firstName, member.lastName]);

  const renderPhoto = (photoUrl?: string, alt: string = "รูปถ่าย", error: boolean = false, setError?: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (error || !photoUrl) {
      return (
        <div className="photo-placeholder">
          <svg className="w-12 h-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
          </svg>
        </div>
      );
    }
    return <img src={photoUrl} alt={alt} className="photo-img" onError={() => setError && setError(true)} />;
  };

  return (
    <div className="member-card">
      <div className="photos">
        {renderPhoto(member.photo1, `${member.firstName} Photo`, isImageError1, setIsImageError1)}
        {member.photo2 && renderPhoto(member.photo2, `${member.firstName} Photo 2`, isImageError2, setIsImageError2)}
      </div>

      <div className="flex-1 text-center md:text-left space-y-2">
        <h3>{member.title} {member.firstName} {member.lastName}</h3>

        <div className="flex gap-2 justify-center md:justify-start mt-2">
          {member.profileUrl && <a href={member.profileUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">โปรไฟล์</a>}
          <button onClick={() => member.id && onEdit(member.id)} className="btn-primary">แก้ไข</button>
          <button onClick={() => member.id && onDelete(member.id)} className="btn-secondary">ลบ</button>
        </div>

        <button onClick={() => setShowDetails(!showDetails)} className="toggle-button">
          {showDetails ? "ซ่อนข้อมูลเพิ่มเติม" : "คลิกดูข้อมูลเพิ่มเติม"}
        </button>

        {showDetails && (
          <div className="details">
            <p>ตำแหน่ง: {member.ministerPosition || randomPosition.position}</p>
            <p>กระทรวง: {member.ministry || randomPosition.ministry}</p>

            <div className="flex flex-wrap gap-2 pt-1">
              {member.politicalParty && <span className="tag">{member.politicalParty}</span>}
              {member.province && <span className="tag">{member.province}</span>}
            </div>

            {member.workHistory && (
              <div>
                <p>ประวัติการทำงาน:</p>
                <p className="line-clamp-3">{member.workHistory}</p>
              </div>
            )}

            <div>
              <p>ผลงานที่ผ่านมา:</p>
              <p className="line-clamp-3">{member.achievements && member.achievements !== "ข้อมูลผลงานจะต้องกรอกเพิ่มเติม" ? member.achievements : randomAchievements}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default MemberCard;
