import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-start justify-center py-20">
            <h2 className="text-2xl font-bold text-foreground">
                404 – 找不到该页面
            </h2>
            <p className="mt-4 text-muted-foreground">
                抱歉，你访问的页面可能已经被移动、删除，或者原本就不存在。
            </p>
            <Link
                href="/"
                className="mt-12 text-sm font-medium hover:underline text-foreground hover:text-foreground"
            >
                ← 返回首页
            </Link>
        </div>
    );
}