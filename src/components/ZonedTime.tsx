interface ZonedTimeProps {
    dateStr: string;
    mode?: 'date' | 'datetime';
}

export default function ZonedTime({ dateStr, mode = 'date' }: ZonedTimeProps) {
    const dateObj = new Date(dateStr);

    const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Shanghai',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        ...(mode === 'datetime' && {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        })
    };

    return (
        <time
            dateTime={dateObj.toISOString()}
            title="Asia/Shanghai (UTC+8)"
            className="tabular-nums"
        >
            {dateObj.toLocaleDateString('zh-CN', options)}
        </time>
    );
}