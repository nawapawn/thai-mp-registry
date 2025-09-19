// src/components/MemberForm.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useRef } from "react";
import { memberSchema, type Member } from "../types/member";
import { FaUser, FaCheckCircle, FaBuilding, FaBriefcase, FaStar } from "react-icons/fa";
import "../index.css";
interface MemberFormProps {
  defaultValues?: Member;
  onSubmit: (data: Member) => void;
  onCancel?: () => void;
  scrollToCard?: (id?: number) => void;
}

const titleOptions = [
  "นาย","นาง","นางสาว","ศาสตราจารย์","รองศาสตราจารย์",
  "ผู้ช่วยศาสตราจารย์","ดร.","ศ.ดร.","รศ.ดร.","ผศ.ดร.",
];

export default function MemberForm({ defaultValues, onSubmit, onCancel, scrollToCard }: MemberFormProps) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Member>({
    resolver: zodResolver(memberSchema),
    defaultValues: { title: "", firstName: "", ...defaultValues },
  });

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const lastSubmittedId = useRef<number | undefined>(undefined);

  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    reset(defaultValues || {});
    if (defaultValues) {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [defaultValues, reset]);

  const inputClass = "mt-1 block w-full rounded-xl border border-gray-300 bg-white/50 backdrop-blur-md p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 transition";

  const handleFormSubmit = (data: Member) => {
    onSubmit(data);
    lastSubmittedId.current = (data.id as number) || undefined;
    setModalMessage(defaultValues ? "อัปเดตข้อมูลสำเร็จ!" : "เพิ่มสมาชิกสำเร็จ!");
    setShowModal(true);
    reset();
  };

  const handleCancel = () => {
    reset(defaultValues || {});
    setModalMessage("ยกเลิกการแก้ไข!");
    setShowModal(true);
    if (onCancel) onCancel();
  };

  const handleModalConfirm = () => {
    setShowModal(false);
    if (lastSubmittedId.current && scrollToCard) {
      scrollToCard(lastSubmittedId.current);
    }
  };

  return (
    <>
      <div ref={formRef} className="bg-white/30 backdrop-blur-md rounded-3xl p-6 space-y-6 shadow-lg border border-white/50">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FaUser /> {defaultValues ? "แก้ไขข้อมูลสมาชิก" : "เพิ่มสมาชิกใหม่"}
        </h2>
        <p className="text-sm text-gray-600">ข้อมูลที่มีเครื่องหมาย * เป็นข้อมูลจำเป็น</p>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* คำนำหน้า / ชื่อ / นามสกุล */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium">คำนำหน้า <span className="text-red-500">*</span></label>
              <select {...register("title")} className={inputClass}>
                <option value="">เลือกคำนำหน้า</option>
                {titleOptions.map(title => <option key={title} value={title}>{title}</option>)}
              </select>
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium">ชื่อ <span className="text-red-500">*</span></label>
              <input type="text" {...register("firstName")} placeholder="กรอกชื่อ" className={inputClass} />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium">นามสกุล <span className="text-red-500">*</span></label>
              <input type="text" {...register("lastName")} placeholder="กรอกนามสกุล" className={inputClass} />
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
            </div>
          </div>

          {/* รูปถ่าย */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium">รูปถ่ายหลัก (URL)</label>
              <input type="url" {...register("photo1")} placeholder="URL รูปถ่ายหลัก" className={inputClass} />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium">รูปรอง (URL)</label>
              <input type="url" {...register("photo2")} placeholder="URL รูปรอง" className={inputClass} />
            </div>
          </div>

          {/* สังกัดพรรค */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">สังกัดพรรคการเมือง <span className="text-red-500">*</span></label>
            <input type="text" {...register("politicalParty")} placeholder="กรอกสังกัดพรรค" className={inputClass} />
            {errors.politicalParty && <p className="text-red-500 text-sm mt-1">{errors.politicalParty.message}</p>}
          </div>

          {/* ตำแหน่ง / กระทรวง */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium flex items-center gap-1"><FaBriefcase /> ตำแหน่งรัฐมนตรี</label>
              <input type="text" {...register("ministerPosition")} placeholder="กรอกตำแหน่งรัฐมนตรี" className={inputClass} />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium flex items-center gap-1"><FaBuilding /> กระทรวง</label>
              <input type="text" {...register("ministry")} placeholder="กรอกกระทรวง" className={inputClass} />
            </div>
          </div>

          {/* ประวัติการทำงาน */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium flex items-center gap-1"><FaBriefcase /> ประวัติการทำงาน <span className="text-red-500">*</span></label>
            <textarea {...register("workHistory")} rows={4} placeholder="กรอกประวัติการทำงาน" className={inputClass} />
            {errors.workHistory && <p className="text-red-500 text-sm mt-1">{errors.workHistory.message}</p>}
          </div>

          {/* ผลงานที่ผ่านมา */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium flex items-center gap-1"><FaStar /> ผลงานที่ผ่านมา <span className="text-red-500">*</span></label>
            <textarea {...register("achievements")} rows={4} placeholder="กรอกผลงานที่ผ่านมา" className={inputClass} />
            {errors.achievements && <p className="text-red-500 text-sm mt-1">{errors.achievements.message}</p>}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 mt-6">
            <button type="button" onClick={handleCancel} className="px-6 py-2 rounded-xl text-gray-800 font-medium border border-gray-300 hover:bg-white/20 transition backdrop-blur-sm">
              ยกเลิก
            </button>
            <button type="submit" className="px-6 py-2 rounded-xl text-white font-medium bg-gray-600 hover:bg-gray-900 transition">
              {defaultValues ? "อัปเดตข้อมูล" : "เพิ่มสมาชิก"}
            </button>
          </div>
        </form>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="bg-white/30 backdrop-blur-md rounded-2xl p-6 w-80 space-y-4 shadow-lg transition-all duration-300 ease-in-out transform scale-100 opacity-100 animate-fadeIn">
            <div className="flex flex-col items-center gap-2">
              <FaCheckCircle className="text-green-500 text-5xl" />
              <p className="text-gray-800 font-semibold text-center">{modalMessage}</p>
              <button
                onClick={handleModalConfirm}
                className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition"
              >
                ยืนยัน
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
