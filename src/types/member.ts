import { z } from 'zod';

export const memberSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, 'กรุณาเลือกคำนำหน้า'),
  firstName: z.string().min(1, 'กรุณากรอกชื่อ'),
  lastName: z.string().min(1, 'กรุณากรอกนามสกุล'),
  photo1: z.string().url('กรุณากรอก URL รูปถ่ายที่ 1 ที่ถูกต้อง').optional(),
  photo2: z.string().url('กรุณากรอก URL รูปถ่ายที่ 2 ที่ถูกต้อง').optional(),
  workHistory: z.string().min(10, 'กรุณากรอกประวัติการทำงานอย่างน้อย 10 ตัวอักษร'),
  achievements: z.string().min(10, 'กรุณากรอกผลงานที่ผ่านมาอย่างน้อย 10 ตัวอักษร'),
  ministerPosition: z.string().optional(),
  ministry: z.string().optional(),
  politicalParty: z.string().min(1, 'กรุณากรอกสังกัดพรรคการเมือง'),
  province: z.string().optional(),
  profileUrl: z.string().url().optional(),
  mpId: z.string().optional(),
});

export type Member = z.infer<typeof memberSchema>;
