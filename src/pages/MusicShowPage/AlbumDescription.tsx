type AlbumDescriptionProps = {
    desc?: string[]
}

const AlbumDescription = ({ desc }: AlbumDescriptionProps) => {
    const descParagraphs = desc?.map((paragraph, index) => {
        const keyStr = paragraph.substring(0, 2).replaceAll(/s/g, '');
        const key = `${index}-${keyStr}`;
        return <p key={key}>{paragraph}</p>
    })

    return desc ? <article>{descParagraphs}</article> : null;
}

export default AlbumDescription;