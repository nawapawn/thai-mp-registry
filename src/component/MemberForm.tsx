import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { memberSchema, type Member } from '../types/member';

interface MemberFormProps {
  defaultValues?: Member;
  onSubmit: (data: Member) => void;
  cancelEdit: () => void;
}

const titleOptions = [
  'นาย',
  'นาง',
  'นางสาว',
  'ศาสตราจารย์',
  'รองศาสตราจารย์',
  'ผู้ช่วยศาสตราจารย์',
  'ดร.',
  'ศ.ดร.',
  'รศ.ดร.',
  'ผศ.ดร.',
];

export default function MemberForm({ defaultValues, onSubmit, cancelEdit }: MemberFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Member>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      title: '',
      firstName: '',
      lastName: '',
      photo1: '',
      photo2: '',
      workHistory: '',
      achievements: '',
      ministerPosition: '',
      ministry: '',
      politicalParty: '',
      ...defaultValues, // เผื่อกรณี mount ครั้งแรกมีค่า
    },
  });

  // 🟢 เพิ่มตรงนี้
  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const handleFormSubmit = (data: Member) => {
    onSubmit(data);
    reset();
  };

  const handleCancel = () => {
    reset();
    cancelEdit();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        {defaultValues ? 'แก้ไขข้อมูลสมาชิกสภาผู้แทนราษฎร' : 'เพิ่มสมาชิกสภาผู้แทนราษฎร'}
      </h2>
      
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* คำนำหน้า */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              คำนำหน้า *
            </label>
            <select
              {...register('title')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">เลือกคำนำหน้า</option>
              {titleOptions.map((title) => (
                <option key={title} value={title}>
                  {title}
                </option>
              ))}
            </select>
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* ชื่อ */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ชื่อ *
            </label>
            <input
              type="text"
              {...register('firstName')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="กรอกชื่อ"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
            )}
          </div>

          {/* นามสกุล */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              นามสกุล *
            </label>
            <input
              type="text"
              {...register('lastName')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="กรอกนามสกุล"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* รูปถ่าย */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              รูปถ่าย 1
            </label>
            <input
              type="url"
              {...register('photo1')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="URL รูปถ่าย 1"
            />
            {errors.photo1 && (
              <p className="text-red-500 text-sm mt-1">{errors.photo1.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              รูปถ่าย 2
            </label>
            <input
              type="url"
              {...register('photo2')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="URL รูปถ่าย 2"
            />
            {errors.photo2 && (
              <p className="text-red-500 text-sm mt-1">{errors.photo2.message}</p>
            )}
          </div>
        </div>

        {/* ประวัติการทำงาน */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ประวัติการทำงาน *
          </label>
          <textarea
            {...register('workHistory')}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="กรอกประวัติการทำงาน"
          />
          {errors.workHistory && (
            <p className="text-red-500 text-sm mt-1">{errors.workHistory.message}</p>
          )}
        </div>

        {/* ผลงานที่ผ่านมา */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ผลงานที่ผ่านมา *
          </label>
          <textarea
            {...register('achievements')}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="กรอกผลงานที่ผ่านมา"
          />
          {errors.achievements && (
            <p className="text-red-500 text-sm mt-1">{errors.achievements.message}</p>
          )}
        </div>

        {/* ตำแหน่งรัฐมนตรีและกระทรวง */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ตำแหน่งรัฐมนตรี
            </label>
            <input
              type="text"
              {...register('ministerPosition')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="กรอกตำแหน่งรัฐมนตรี (ถ้ามี)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              กระทรวง
            </label>
            <input
              type="text"
              {...register('ministry')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="กรอกกระทรวง (ถ้ามี)"
            />
          </div>
        </div>

        {/* สังกัดพรรคการเมือง */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            สังกัดพรรคการเมือง *
          </label>
          <input
            type="text"
            {...register('politicalParty')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="กรอกสังกัดพรรคการเมือง"
          />
          {errors.politicalParty && (
            <p className="text-red-500 text-sm mt-1">{errors.politicalParty.message}</p>
          )}
        </div>

        {/* ปุ่ม */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            ยกเลิก
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {defaultValues ? 'อัปเดตข้อมูล' : 'เพิ่มสมาชิก'}
          </button>
        </div>
      </form>
    </div>
  );
}
