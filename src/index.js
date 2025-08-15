import { instructorName, subjectInfo } from './data/subjectInfo.js';
import { printInstructor } from './utils/printInstructor.js';

// Giữ hành vi in instructor như bản gốc
console.log(instructorName);

// Giữ lời chào như bản gốc
const lastName = 'Nguyễn Đức Anh Tài';
const msg = 'Hello, ' + lastName + '! Welcome to the course.';
console.log(msg);

const nsg = `Hello, ${lastName}! Welcome to the course.`;
console.log(nsg);

// Dùng tiện ích đã fix để in dòng Instructor
printInstructor(instructorName);

// Ví dụ cập nhật địa chỉ (bất biến)
const updatedSubjectInfo = { ...subjectInfo, address: 'D2 Binh Thanh, Ho Chi Minh City, Vietnam' };
console.log(`Address: ${updatedSubjectInfo.address}`);
