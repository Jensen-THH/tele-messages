export interface SearchParams {
  chat_id: string;
  offset_date: string;
  end_date: string;
  keyword: string;
  limit: number;
  img_flag: boolean;
  topic_id: number | null;
  fetch_username: boolean;
  from_user: string;
}

// export interface Message {
//     _id: string;
//     [key: string]: any;
// }

// export interface ApiResponse {
//     status: 'success' | 'error';
//     data?: Message[] | MessageDetail[];
//     total?: number;
//     total_page?: number;
//     message?: string;
// }

// export interface MessagePayload {
//     filter_query?: { [key: string]: any } | null;
//     sort_by?: string | null;
//     limit?: number | null;
//     page?: number;
//     perPage?: number;
// }

export interface ViewModel {
  currentPage: any;
  currentSize: any;
  totalCount: any;
  filterQuery?: FilterQuery;
  sortBy?: string | null; 
}



// // Removed duplicate ApiResponse interface

// // FilterQuery tối ưu dựa trên MessageDetail
// export interface FilterQuery {
//     message_id?: number;
//     chat_id?: string;
//     date?: string;
//     user_id?: number;
//     text?: string;
//     // Thêm các trường khác nếu cần lọc
// }

// export interface MessagePayload {
//     filter_query?: FilterQuery | null;
//     sort_by?: keyof MessageDetail | null; // Sắp xếp theo các field của MessageDetail
//     limit?: number | null;
//     page?: number;
//     perPage?: number;
// }

export interface MessageDetail {
  _id: string;
  message_id: number;
  chat_id: string;
  date: string;
  date_vn: string;
  text: string;
  views: any;
  reactions: any;
  total_reactions: number;
  message_link: string;
  media_base64: any | undefined;
  user_name: string;
  user_id: number;
  reply_to_msg_id: number | undefined;
  reply_to_top_id: number | undefined;
  forum_topic: boolean | undefined;
}

export interface FilterQuery {
  message_id?: number;
  chat_id?: string;
  date?: string;
  user_id?: number;
  text?: string | { $regex: string , $options: string };
  total_reactions?: number;
  [key: string]: string | number | boolean | undefined | { $regex: string , $options: string };
}

export interface ApiResponse {
  status: 'success' | 'error';
  data?: MessageDetail[];
  total?: number;
  total_pages?: number;
  message?: string;
}

export interface MessagePayload {
  filterQuery?: FilterQuery | null;
  sort_by?: any;
  limit?: any | null;
  page?: number;
  perPage?: number;
}