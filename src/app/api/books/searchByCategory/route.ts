import { NextRequest, NextResponse } from 'next/server';

const ENDPOINT = 'http://www.aladin.co.kr/ttb/api/ItemList.aspx';

type SearchCategory =
    | 'ItemNewAll'
    | 'ItemNewSpecial'
    | 'ItemEditorChoice'
    | 'Bestseller';

export async function GET(req: NextRequest) {
    const params = new URLSearchParams({
        ttbkey: process.env.NEXT_PUBLIC_ALADIN_API_KEY as string,
        QueryType: req.headers.get('category') as SearchCategory,
        SearchTarget: 'Book',
        output: 'js',
        Version: '20131101',
    });

    const res = await fetch(ENDPOINT, {
        body: params,
        method: 'post',
    });
    const data = await res.json();

    return NextResponse.json({ data });
}
