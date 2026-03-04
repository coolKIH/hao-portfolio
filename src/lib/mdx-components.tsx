import Image from "next/image";

interface MdxImageProps {
    src: string;
    alt?: string;
    width?: string | number;
    height?: string | number;
    caption?: string;
}

function MdxImage(props: MdxImageProps) {
    const width = props.width ? Number(props.width) : 1200;
    const height = props.height ? Number(props.height) : 800;
    const { caption, ...imageProps } = props;

    return (
        <figure className="my-8">
            <Image
                {...imageProps}
                src={props.src}
                alt={props.alt || ""}
                width={width}
                height={height}
                className="w-full h-auto rounded-lg border border-stone-200 dark:border-stone-800"
            />
            {caption && (
                <figcaption className="mt-2 text-center text-sm text-muted-foreground">
                    {caption}
                </figcaption>
            )}
        </figure>
    );
}

export const mdxComponents = {
    Image: MdxImage,
};