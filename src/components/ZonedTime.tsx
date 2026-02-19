interface ZonedTimeProps {
    dateStr: string;
    mode?: 'date' | 'datetime';
}

export default function ZonedTime({ dateStr, mode = 'date' }: ZonedTimeProps) {
    const dateObj = new Date(dateStr);

    // Check if the original string contains time information (T or :)
    const hasTime = dateStr.includes('T') || dateStr.includes(':');

    // Base configuration: always include year, month, and day
    const baseOptions: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Shanghai',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    // 1. Display value: Determined by the 'mode' prop and availability of time data
    const displayValue = dateObj.toLocaleDateString('zh-CN', {
        ...baseOptions,
        ...(mode === 'datetime' && hasTime && {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        }),
    });

    // 2. Title attribute: Always show maximum precision available from the source
    const titleValue = dateObj.toLocaleDateString('zh-CN', {
        ...baseOptions,
        ...(hasTime && {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        }),
    }) + ' (Asia/Shanghai, UTC+8)';

    return (
        <time
            dateTime={dateObj.toISOString()}
            title={titleValue}
            className="tabular-nums"
        >
            {displayValue}
        </time>
    );
}