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
    media_base64: any;
    user_name: string;
    user_id: number;
    reply_to_msg_id: number;
    reply_to_top_id: number;
    forum_topic: boolean;
}
