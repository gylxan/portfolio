import { BiCategory } from 'react-icons/bi';
import { MdWorkOutline } from 'react-icons/md';
import { HiDocument } from 'react-icons/hi';
import { BsFilePost } from 'react-icons/bs';
import { AiFillProject } from 'react-icons/ai';
import { IoLanguage } from 'react-icons/io5';

export const documentTypeIcons: Record<string, any> = {
  category: BiCategory,
  experience: MdWorkOutline,
  page: HiDocument,
  post: BsFilePost,
  project: AiFillProject,
  translation: IoLanguage,
};
