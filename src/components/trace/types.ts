export type Footprint = {
    id: string;
    nickname: string;
    content: string;
    created_at: string;
};

export type ConnectionStatus = 'connecting' | 'connected' | 'error';