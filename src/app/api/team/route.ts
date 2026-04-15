import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { getTeamMembers, saveTeamMember, deleteTeamMember } from '@/lib/data';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const members = await getTeamMembers();
        return NextResponse.json({ members });
    } catch (error) {
        console.error('Error fetching team members:', error);
        return NextResponse.json({ error: 'Failed to fetch team members' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const user = await getCurrentUser();

        if (!user || user.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const memberData = await request.json();
        const member = await saveTeamMember(memberData);

        return NextResponse.json({ member, message: 'Team member created successfully' });
    } catch (error) {
        console.error('Error creating team member:', error);
        return NextResponse.json({ error: 'Failed to create team member' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const user = await getCurrentUser();

        if (!user || user.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const memberData = await request.json();
        const member = await saveTeamMember(memberData);

        return NextResponse.json({ member, message: 'Team member updated successfully' });
    } catch (error) {
        console.error('Error updating team member:', error);
        return NextResponse.json({ error: 'Failed to update team member' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const user = await getCurrentUser();

        if (!user || user.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Member ID required' }, { status: 400 });
        }

        await deleteTeamMember(id);

        return NextResponse.json({ message: 'Team member deleted successfully' });
    } catch (error: any) {
        console.error('Error deleting team member:', error);
        if (error.code === 'P2025') {
            return NextResponse.json({ error: 'Team member not found' }, { status: 404 });
        }
        return NextResponse.json({ error: 'Failed to delete team member' }, { status: 500 });
    }
}
