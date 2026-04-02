interface ZonedTimeProps {
    dateStr: string;
    mode?: 'date' | 'datetime';
}

export default function ZonedTime({ dateStr, mode = 'date' }: ZonedTimeProps) {
    const dateObj = new Date(dateStr);

    // Check if the original string contains time information
    const hasTime = dateStr.includes('T') || dateStr.includes(':');

    // Base configuration for Shanghai timezone
    const baseOptions: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Shanghai',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    // Display value (what user sees)
    const displayValue = dateObj.toLocaleDateString('en-US', {
        ...baseOptions,
        ...(mode === 'datetime' && hasTime && {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        }),
    });

    // Title attribute (shown on hover) - always shows full precision
    const titleValue = dateObj.toLocaleDateString('en-US', {
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