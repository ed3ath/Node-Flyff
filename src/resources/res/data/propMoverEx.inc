/*
 06.04.07 -xuzhu-
 �Ϲ����� ������ ������ �⺻ ��å ����.
 1.�Ϲ����� ����/���� �⺻������ ��� ���Ϳ��Լ� ����ǰ� ����Ǿ���.
 2.�������� ����/���� ������ ���ͷ������� 2~5���� ���� �������� ����ǵ��� �Ͽ���.
 3.����ũ���� ����� ����� Ȯ���� ���������ε� ���� �� ������ Ư�� ���Ϳ��Լ� ���� Ȯ���� �� ���� �Ѵ�.
 .DropKind�� nMinUniq, nMaxUniq�� �Ķ���ʹ� ���̻� ������ �ʰ� �ٲپ���.
 .�������� ��ũ��Ʈ�� ������ ������ pPropMover->dwLevel - 2 ~ -5������ �����ǰ� �ٲپ���.
 .�̴� �Ϲ������� ���͵��� ��� ����Ҷ� ���������� 2~5���� ���� ���� ����ǰ� �Ͽ�
 .���������� ����� �����ϰ� �߶����� �����ϰ�, ���� �ִٸ� �� ���� �������� �缭 ����� �� �ֵ��� �ߴ�.
*/

/*
������ �߻� ���� O -> �߻� �ִ� ������ ���� ������ �߻�, 25% ��
		 X -> ������ ���� 100% ��

DropItem()�� �ִ뷮�� 32���̹Ƿ� �Լ��� �� �̻� ���� �ʵ��� �Ѵ�.
- DropEvenitem�� Dropitem�� ������ ���ӹ���
DropKind()�� �ִ뷮�� 64���̹Ƿ� �Լ��� �� �̻� ���� �ʵ��� �Ѵ�.
DropQuestItem()�� �ִ뷮�� 16����

MVI_MONSTER
{
	Maxitem = �߻� �ִ� ����;
	DropItem(Ư���������ε���, 3000000000(30��)�� Ȯ��, �������߰�����, ���� ����);
	����Ȯ���� ���� ���� ���� ������ �ξ� ����Ȯ���� ���� �������� ������ �߻�������
	�켱������ ���Եǵ��� �Ѵ�.
	DropGold(Min, Max);
	QuestItem(� ����Ʈ�ΰ�, ����Ʈ ����, ����Ʈ������ ���޵Ǵ� ������, Ȯ��, ���ް��� );
	
	m_dwAttackMoveDelay = 0; // �̵��� ������(�и�������)
	m_dwRunawayDelay = 1000; // ������ �� ������(�и�������)
	SetRunAway( HP(percent) );//, NPC Index(0�̸� ���� ����), ����(0�� ����) );
	���� hp, ���� ���� index, ���� ��û�� ���� ��(0 �ֺ��� �˻��Ǵ� �� ���)
	���� ���� ��û�� ���Ͱ� �ʿ� ���ٸ� index�� 0����
	SetCallHelper( HP(Percent), NPC(Index), ����(0�̸� ����), bParty(TRUE,FALSE, ���� ����ڸ� �ش� �÷��̾��� ��Ƽ �ɹ��� ����) ); 
	m_nAttackFirstRange = 10; // ���� ���� �����ϱ� ���� ��ĵ ����. ���� ����
}

AI
{
    Scan jon (jobNum) range (num) quest (QuestID) item (ItemID) chao (100,101) s
    Attack (%) cunning (Hi,sam,low)                B
    Recovery (%) (%) (%) (u/m/a)                   B
    Summon (%) (num) (MoverID) B  // 20�ʸ��� �ѹ��� (%)Ȯ���� ��ȯ�õ�. MoverID�� num���� ����.
    Rangeattack (X)                                B 
    Keeprangeattack (Range)                        B  
    Evade (%)                                      B
    Helper   (freq) (sr) (num) (mtype)             B
    Berserk  (hp) (%)                              B
    Randomtarget  ���ϸ��� ���̴� ��� ���        B 
    teleport (freq) (X,Y or 1~5) (mana) (batt)     M
    Loot     (d) (X,Y) (code) (?)                  M
       
}

���� 		Ȯ��		1���� �������� ���ͼ�
9375		0.0003125%	320000
18750		0.000625%	160000
37500		0.00125%	80000
75000		0.0025%		40000
150000		0.005%		20000
300000		0.01%		10000
1000000		0.0333%		3000
1875000		0.0625%		1600
3000000		0.1%		1000
3750000		0.125%		800
5000000		0.166%		600
7500000		0.25%		400
15000000	0.5%		200
30000000	1%		100
300000000	10%		10
3000000000	100%		1
*/

MI_AIBATT1
{
	Maxitem = 2;
	DropGold(6, 9);

	DropItem(II_GEN_GEM_GEM_TWINKLESTONE, 300000000, 0, 1);

	m_dwAttackMoveDelay = 2000;
	m_dwRunawayDelay = 3000;
	m_nAttackFirstRange = 8;
   
        AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low
//			evade 5
                    }
		#move
		    {
			Loot d 5
		    }	
   	}               
}
MI_AIBATT2
{
	Maxitem = 2;
	DropGold(6, 9);
	

	DropItem(II_GEN_GEM_GEM_TWINKLESTONE, 200000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan 
                    }
		#battle
		    {
			Attack cunning low
                               
                    }
		#move
		    {
			Loot d 5
		    }	
   	}               
}
MI_AIBATT3
{
	Maxitem = 2;
	DropGold(8, 11);
	
	DropItem(II_GEN_GEM_GEM_TWINKLESTONE, 200000000, 0, 1);

	m_nAttackFirstRange = 8;

      	AI
	{
		#Scan
                    {
			scan range 8
                    }
		#battle
		    {
			Attack cunning low
                             
                    }
		#move
		    {
			
		    }	
   	}               
}
MI_AIBATT4
{
	Maxitem = 5;
	DropGold(78, 113);
	DropKind(IK3_SWD, 1, 6);
	DropKind(IK3_HELMET, 1, 6);
	DropKind(IK3_SUIT, 1, 6);
	DropKind(IK3_GAUNTLET, 1, 6);
	DropKind(IK3_BOOTS, 1, 6);
	DropKind(IK3_SHIELD, 1, 6);
	
	DropItem(II_GEN_MAT_ELE_FLAME, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_FLAME, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropItem(II_GEN_GEM_GEM_TWINKLESTONE, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_TWINKLESTONE, 1000000000, 0, 1);
	DropItem(II_GEN_FOO_INS_LOLLIPOP, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_INS_LOLLIPOP, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_INS_LOLLIPOP, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ORANGEJUIICE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ORANGEJUIICE, 600000001, 0, 1);

	m_dwAttackMoveDelay = 0;
	m_dwRunawayDelay = 1000;
	SetRunAway( 10, MI_AIBATT2, 5 );
	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low
			Recovery 10 50 100 m
			evade 20
                                                            
                    }
		#move
		    {
			Loot d 5
		    }	
   	}               
}
MI_MUSHPANG1
{
	Maxitem = 2;
	DropGold(9, 13);

	DropItem(II_GEN_GEM_GEM_FORFORM, 300000000, 0, 1);
	DropItem(II_GEN_FOO_INS_LOLLIPOP, 1000000001, 0, 1);

	m_dwAttackMoveDelay = 2000;
	m_dwRunawayDelay = 3000;
	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan range 6
                    }
		#battle
		    {
			Attack			                   
                    }
		#move
		    {
			Loot d 5
		    }	
   	}               
}
MI_MUSHPANG2
{
	Maxitem = 2;
	DropGold(9, 13);

	DropItem(II_GEN_GEM_GEM_FORFORM, 200000000, 0, 1);
	
	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low
//                        evade 10
                    }
		#move
		    {
			
		    }	
   	}               
}
MI_MUSHPANG3
{
	Maxitem = 2;
	DropGold(10, 15);

	DropItem(II_GEN_GEM_GEM_FORFORM, 200000000, 0, 1);

	m_nAttackFirstRange = 8;
	
	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low
                    }
		#move
		    {
			Loot d 3
		    }	
   	}               
}
MI_MUSHPANG4 
{
	Maxitem = 5;
	DropGold(100, 146);
	DropKind(IK3_SWD, 3, 8);
	DropKind(IK3_HELMET, 3, 8);
	DropKind(IK3_SUIT, 3, 8);
	DropKind(IK3_GAUNTLET, 3, 8);
	DropKind(IK3_BOOTS, 3, 8);
	DropKind(IK3_SHIELD, 3, 8);
	
	DropItem(II_GEN_MAT_ELE_RIVER, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_RIVER, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropItem(II_GEN_GEM_GEM_FORFORM, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_FORFORM, 1000000000, 0, 1);
	DropItem(II_GEN_FOO_INS_LOLLIPOP, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_INS_LOLLIPOP, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_INS_LOLLIPOP, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ORANGEJUIICE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ORANGEJUIICE, 600000001, 0, 1);

	m_dwAttackMoveDelay = 0;
	m_dwRunawayDelay = 1000;
	SetRunAway( 10, MI_MUSHPANG2, 5 );
	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low
                        evade 20
			Recovery 20 50 100 m
                                    
                    }
		#move
		    {
			Loot d 4
		    }	
   	}               
}
MI_BURUDENG1
{
	Maxitem = 2;
	DropGold(11, 16);
	DropKind(IK3_SWD, 1, 3);
	DropKind(IK3_SUIT, 1, 3);
	DropKind(IK3_GAUNTLET, 1, 3);
	DropKind(IK3_BOOTS, 1, 3);

	DropItem(II_GEN_GEM_GEM_PALIN, 300000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low
                                                
                    }
		#move
		    {
			
		    }	
   	}               
}
MI_BURUDENG2
{
	Maxitem = 2;
	DropGold(11, 16);
	DropKind(IK3_SWD, 1, 3);
	DropKind(IK3_SUIT, 1, 3);
	DropKind(IK3_GAUNTLET, 1, 3);
	DropKind(IK3_BOOTS, 1, 3);
	
	DropItem(II_GEN_GEM_GEM_PALIN, 200000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			                                                         
                    }
		#move
		    {
			Loot d 3
		    }	
   	}               
}
MI_BURUDENG3
{
	Maxitem = 2;
	DropGold(12, 18);
	DropKind(IK3_SWD, 2, 5);
	DropKind(IK3_SUIT, 2, 5);
	DropKind(IK3_GAUNTLET, 2, 5);
	DropKind(IK3_BOOTS, 2, 5);
	
	DropItem(II_GEN_GEM_GEM_PALIN, 200000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low
                    }
		#move
		    {
			
		    }	
   	}               
}
MI_BURUDENG4
{
	Maxitem = 5;
	DropGold(123, 178);
	DropKind(IK3_SWD, 5, 10);
	DropKind(IK3_HELMET, 5, 10);
	DropKind(IK3_SUIT, 5, 10);
	DropKind(IK3_GAUNTLET, 5, 10);
	DropKind(IK3_BOOTS, 5, 10);
	DropKind(IK3_SHIELD, 5, 10);


	DropItem(II_GEN_GEM_GEM_PALIN, 750000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_PALIN, 750000000, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSKEWER, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSKEWER, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSKEWER, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ORANGEJUIICE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ORANGEJUIICE, 600000001, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low
                        evade 30
                        
                                    
                    }
		#move
		    {
			loot d 5
		    }	
   	}               
}
MI_PUKEPUKE1
{
	Maxitem = 2;
	DropGold(14, 20);
	DropKind(IK3_SWD, 3, 6);
	DropKind(IK3_AXE, 3, 6);
	DropKind(IK3_SUIT, 3, 6);
	DropKind(IK3_GAUNTLET, 3, 6);
	DropKind(IK3_BOOTS, 3, 6);
	
	DropItem(II_GEN_GEM_GEM_CHUPIM, 300000000, 0, 1);

	m_dwAttackMoveDelay = 0;
	m_dwRunawayDelay = 750;
	SetRunAway( 10, 0, 1 );
	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                                                            
                    }
		#move
		    {
			
		    }	
   	}               
}
MI_PUKEPUKE2
{
	Maxitem = 2;
	DropGold(14, 20);
	DropKind(IK3_SWD, 3, 6);
	DropKind(IK3_AXE, 3, 6);
	DropKind(IK3_SUIT, 3, 6);
	DropKind(IK3_GAUNTLET, 3, 6);
	DropKind(IK3_BOOTS, 3, 6);
	
	DropItem(II_GEN_GEM_GEM_CHUPIM, 200000000, 0, 1);

	m_dwAttackMoveDelay = 0;
	m_dwRunawayDelay = 750;
	SetRunAway( 10, MI_BURUDENG3, 1 );
	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low               
                                    
                    }
		#move
		    {
			Loot d 3
		    }	
   	}               
}
MI_PUKEPUKE3
{
	Maxitem = 2;
	DropGold(16, 23);
	DropKind(IK3_SWD, 4, 7);
	DropKind(IK3_AXE, 4, 7);
	DropKind(IK3_SUIT, 4, 7);
	DropKind(IK3_GAUNTLET, 4, 7);
	DropKind(IK3_BOOTS, 4, 7);
	DropKind(IK3_SHIELD, 4, 7);
	
	DropItem(II_GEN_GEM_GEM_CHUPIM, 200000000, 0, 1);

	m_dwAttackMoveDelay = 0;
	m_dwRunawayDelay = 750;
	SetRunAway( 10, 0, 1 );
	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack                       
                                    
                    }
		#move
		    {
			loot d 5
		    }	
   	}               
}
MI_PUKEPUKE4
{
	Maxitem = 5;
	DropGold(145, 211);
	DropItem(II_ARM_ARM_SHI_LIGHT, 30000000, 0, 1);
	DropItem(II_GEN_JEW_NEC_FPNECKLACE, 30000000, 1, 1);

	DropItem(II_GEN_MAT_ELE_DESERT, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_DESERT, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropKind(IK3_SWD, 7, 12);
	DropKind(IK3_HELMET, 7, 12);
	DropKind(IK3_SUIT, 7, 12);
	DropKind(IK3_GAUNTLET, 7, 12);
	DropKind(IK3_BOOTS, 7, 12);
	DropKind(IK3_SHIELD, 7, 12);
	DropItem(II_GEN_GEM_GEM_CHUPIM, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_CHUPIM, 1000000000, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSKEWER, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSKEWER, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSKEWER, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ORANGEJUIICE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ORANGEJUIICE, 600000001, 0, 1);

	m_dwAttackMoveDelay = 0;
	m_dwRunawayDelay = 1000;
	SetRunAway( 10, MI_PUKEPUKE1, 5 );
	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                        
                                    
                    }
		#move
		    {
			
		    }	
   	}               
}
MI_PEAKYTURTLE1
{
	Maxitem = 2;
	DropGold(16, 23);
	DropKind(IK3_SWD, 4, 7);
	DropKind(IK3_AXE, 4, 7);
	DropKind(IK3_SUIT, 4, 7);
	DropKind(IK3_GAUNTLET, 4, 7);
	DropKind(IK3_BOOTS, 4, 7);
	DropKind(IK3_SHIELD, 4, 7);


	DropItem(II_GEN_GEM_GEM_PEAKYRIND, 300000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 20 cunning hi
                                                            
                    }
		#move
		    {
			Loot d 3
		    }	
   	}               
}
MI_PEAKYTURTLE2
{
	Maxitem = 2;
	DropGold(16, 23);
	DropKind(IK3_SWD, 6, 9);
	DropKind(IK3_AXE, 6, 9);
	DropKind(IK3_SUIT, 6, 9);
	DropKind(IK3_GAUNTLET, 6, 9);
	DropKind(IK3_BOOTS, 6, 9);
	DropKind(IK3_SHIELD, 3, 7);

	DropItem(II_GEN_GEM_GEM_PEAKYRIND, 200000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 10 cunning low			
                                                            
                    }
		#move
		    {
			
		    }	
   	}               
}
MI_PEAKYTURTLE3
{
	Maxitem = 2;
	DropGold(17, 25);

	DropKind(IK3_SWD, 6, 10);
	DropKind(IK3_AXE, 6, 10);
	DropKind(IK3_SUIT, 6, 10);
	DropKind(IK3_GAUNTLET, 6, 10);
	DropKind(IK3_BOOTS, 6, 10);
	DropKind(IK3_SHIELD, 3, 7);

	DropItem(II_GEN_GEM_GEM_PEAKYRIND, 200000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low
                             
                    }
		#move
		    {
			
		    }	
   	}               
}
MI_PEAKYTURTLE4
{
	Maxitem = 5;
	DropGold(156, 227);
	DropItem(II_GEN_JEW_NEC_HPNECKLACE, 30000000, 0, 1);
	DropItem(II_GEN_JEW_NEC_MPNECKLACE, 30000000, 0, 1);

	DropKind(IK3_SWD, 6, 13);
	DropKind(IK3_AXE, 6, 13);
	DropKind(IK3_HELMET, 6, 13);
	DropKind(IK3_SUIT, 6, 13);
	DropKind(IK3_GAUNTLET, 6, 13);
	DropKind(IK3_BOOTS, 6, 13);
	DropKind(IK3_SHIELD, 6, 13);
	
	DropItem(II_GEN_MAT_ELE_GENERATOR, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_GENERATOR, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropItem(II_GEN_GEM_GEM_PEAKYRIND, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_PEAKYRIND, 1000000000, 0, 1);
	DropItem(II_GEN_POT_DRI_VITAL100,  110000000, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSKEWER, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSKEWER, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSKEWER, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ORANGEJUIICE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ORANGEJUIICE, 600000001, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low
                        berserk 30 1.2  
                                    
                    }
		#move
		    {
			loot d 5
		    }	
   	}               
}
MI_DEMIAN1
{
	Maxitem = 2;
	DropGold(17, 25);
	DropKind(IK3_SWD, 7, 11);
	DropKind(IK3_AXE, 7, 11);
	DropKind(IK3_SUIT, 7, 11);
	DropKind(IK3_GAUNTLET, 7, 11);
	DropKind(IK3_BOOTS, 7, 11);
	DropKind(IK3_SHIELD, 5, 9);

	DropItem(II_GEN_GEM_GEM_MOP, 300000000, 0, 1);

	m_dwAttackMoveDelay = 0;
	m_dwRunawayDelay = 750;
	SetRunAway( 10, 0, 1 );
	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning hi
                        Evade 15                                    
                    }
		#move
		    {
			Loot d 3
		    }	
   	}               
}
MI_DEMIAN2
{
	Maxitem = 2;
	DropGold(17, 25);
	DropKind(IK3_SWD, 7, 11);
	DropKind(IK3_AXE, 7, 11);
	DropKind(IK3_HELMET, 1, 5);
	DropKind(IK3_SUIT, 7, 11);
	DropKind(IK3_GAUNTLET, 7, 11);
	DropKind(IK3_BOOTS, 7, 11);
	DropKind(IK3_SHIELD, 6, 10);


	DropItem(II_GEN_GEM_GEM_MOP, 300000000, 0, 1);

	m_dwAttackMoveDelay = 0;
	m_dwRunawayDelay = 750;
	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning hi
                        Evade 15                                    
                    }
		#move
		    {
			
		    }	
   	}               
}
MI_DEMIAN3
{
	Maxitem = 2;
	DropGold(19, 27);
	DropKind(IK3_SWD, 7, 11);
	DropKind(IK3_AXE, 7, 11);
	DropKind(IK3_HELMET, 1, 5);
	DropKind(IK3_SUIT, 7, 11);
	DropKind(IK3_GAUNTLET, 7, 11);
	DropKind(IK3_BOOTS, 7, 11);
	DropKind(IK3_SHIELD, 6, 10);


	DropItem(II_GEN_GEM_GEM_MOP, 200000000, 0, 1);

	m_dwAttackMoveDelay = 0;
	m_dwRunawayDelay = 750;
	SetRunAway( 10, 0, 1 );
	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning hi
                        Evade 15                                    
                    }
		#move
		    {
			Loot d 3
		    }	
   	}               
}
MI_DEMIAN4
{
	Maxitem = 5;
	DropGold(168, 243);
	DropKind(IK3_SWD, 7, 14);
	DropKind(IK3_AXE, 7, 14);
	DropKind(IK3_HELMET, 7, 14);
	DropKind(IK3_SUIT, 7, 14);
	DropKind(IK3_GAUNTLET, 7, 14);
	DropKind(IK3_BOOTS, 7, 14);
	DropKind(IK3_SHIELD, 7, 14);
	
	DropItem(II_GEN_GEM_GEM_MOP, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_MOP, 1000000000, 0, 1);
	DropItem(II_GEN_FOO_INS_BISCUIT, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_INS_BISCUIT, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_INS_BISCUIT, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ORANGEJUIICE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ORANGEJUIICE, 600000001, 0, 1);

	m_dwAttackMoveDelay = 0;
	m_dwRunawayDelay = 1000;
	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low
                                                            
                    }
		#move
		    {
			loot d 5
		    }	
   	}               
}
MI_DORIDOMA1
{
	Maxitem = 2;
	DropGold(20, 30);
	DropKind(IK3_SWD, 8, 12);
	DropKind(IK3_AXE, 8, 12);
	DropKind(IK3_HELMET, 5, 9);
	DropKind(IK3_SUIT, 8, 12);
	DropKind(IK3_GAUNTLET, 8, 12);
	DropKind(IK3_BOOTS, 8, 12);
	DropKind(IK3_SHIELD, 7, 11);

	DropItem(II_GEN_GEM_GEM_POPORAM, 300000000, 0, 1);
	
	m_nAttackFirstRange = 8;

        AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack  
//                        evade 20            
                    }
		#move
		    {
			
		    }	
   	}                 
}
MI_DORIDOMA2
{
	Maxitem = 2;
	DropGold(20, 30);
	DropKind(IK3_SWD, 8, 12);
	DropKind(IK3_AXE, 8, 12);
	DropKind(IK3_HELMET, 5, 9);
	DropKind(IK3_SUIT, 8, 12);
	DropKind(IK3_GAUNTLET, 8, 12);
	DropKind(IK3_BOOTS, 8, 12);
	DropKind(IK3_SHIELD, 7, 11);

	
	DropItem(II_GEN_GEM_GEM_POPORAM, 200000000, 0, 1);

	m_nAttackFirstRange = 8;

        AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack                                    
                    }
		#move
		    {
			loot d 3
		    }	
   	}                  
}
MI_DORIDOMA3
{
	Maxitem = 2;
	DropGold(22, 32);
	DropKind(IK3_SWD, 8, 12);
	DropKind(IK3_AXE, 8, 12);
	DropKind(IK3_HELMET, 5, 9);
	DropKind(IK3_SUIT, 8, 12);
	DropKind(IK3_GAUNTLET, 8, 12);
	DropKind(IK3_BOOTS, 8, 12);
	DropKind(IK3_SHIELD, 7, 11);


	DropItem(II_GEN_GEM_GEM_POPORAM, 200000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack                                   
                    }
		#move
		    {
			
		    }	
   	}
}
MI_DORIDOMA4
{
	Maxitem = 5;
	DropGold(196, 284);

	DropItem(II_GEN_JEW_RIN_STRRING, 30000000, 0, 1);
	DropItem(II_GEN_JEW_RIN_INTRING, 30000000, 0, 1);

	DropKind(IK3_SWD, 9, 16);
	DropKind(IK3_AXE, 9, 16);
	DropKind(IK3_HELMET, 9, 16);
	DropKind(IK3_SUIT, 9, 16);
	DropKind(IK3_GAUNTLET, 9, 16);
	DropKind(IK3_BOOTS, 9, 16);
	DropKind(IK3_SHIELD, 9, 16);

	DropItem(II_GEN_MAT_ELE_GENERATOR, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_GENERATOR, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropItem(II_GEN_GEM_GEM_POPORAM, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_POPORAM, 1000000000, 0, 1);
	DropItem(II_GEN_FOO_INS_BISCUIT, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_INS_BISCUIT, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_INS_BISCUIT, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_STRAWBERRYSHAKE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_STRAWBERRYSHAKE, 600000001, 0, 1);
	DropItem(II_GEN_POT_DRI_VITAL100,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_FIRST, 420000000, 0, 1);
//	DropItem(II_GEN_POT_POT_ANTIDOTE, 150000000, 0, 1);
	
	m_dwAttackMoveDelay = 0;
	m_dwRunawayDelay = 1000;
	SetRunAway( 10, MI_DORIDOMA1, 2 );
	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                        Berserk 20 1.2            
                    }
		#move
		    {
			loot d 3
		    }	
   	}               
}
MI_LAWOLF1
{
	Maxitem = 2;
	DropGold(24, 34);
	DropKind(IK3_SWD, 11, 15);
	DropKind(IK3_AXE, 11, 15);
	DropKind(IK3_HELMET, 11, 15);
	DropKind(IK3_SUIT, 11, 15);
	DropKind(IK3_GAUNTLET, 11, 15);
	DropKind(IK3_SHIELD, 11, 15);


	DropItem(II_GEN_GEM_GEM_SLAIN, 300000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack  
//                        Evade 30            
                    }
		#move
		    {
			
		    }	
   	}               
}
MI_LAWOLF2
{
	Maxitem = 2;
	DropGold(24, 34);
	DropKind(IK3_SWD, 11, 15);
	DropKind(IK3_AXE, 11, 15);
	DropKind(IK3_CHEERSTICK, 11, 15);
	DropKind(IK3_KNUCKLEHAMMER, 11, 15);
	DropKind(IK3_WAND, 11, 15);
	DropKind(IK3_STAFF, 11, 15);
	DropKind(IK3_HELMET, 11, 15);
	DropKind(IK3_SUIT, 11, 15);
	DropKind(IK3_GAUNTLET, 11, 15);
	DropKind(IK3_SHIELD, 11, 15);
	DropKind(IK3_BOW, 11, 15);
	DropKind(IK3_YOYO, 11, 15);

	DropItem(II_GEN_GEM_GEM_SLAIN, 300000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack                            
                    }
		#move
		    {
			loot d 5
		    }	
   	}               
}
MI_LAWOLF3
{
	Maxitem = 2;
	DropGold(26, 38);
	DropKind(IK3_SWD, 11, 15);
	DropKind(IK3_AXE, 11, 15);
	DropKind(IK3_CHEERSTICK, 11, 15);
	DropKind(IK3_KNUCKLEHAMMER, 11, 15);
	DropKind(IK3_WAND, 11, 15);
	DropKind(IK3_STAFF, 11, 15);
	DropKind(IK3_HELMET, 11, 15);
	DropKind(IK3_SUIT, 11, 15);
	DropKind(IK3_GAUNTLET, 11, 15);
	DropKind(IK3_BOOTS, 11, 15);
	DropKind(IK3_SHIELD, 11, 15);
	DropKind(IK3_BOW, 11, 15);
	DropKind(IK3_YOYO, 11, 15);

	DropItem(II_GEN_GEM_GEM_SLAIN, 200000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack sam                                                           
                    }
		#move
		    {
			
		    }	
   	}               
}
MI_LAWOLF4
{
	Maxitem = 5;
	DropGold(201, 292);

	DropItem(II_GEN_JEW_NEC_HPNECKLACE, 20000000, 1, 1);
	DropItem(II_GEN_JEW_NEC_MPNECKLACE, 20000000, 3, 1);
	DropItem(II_WEA_SWO_KEHIN, 20000000, 0, 1);
	DropItem(II_WEA_CHEE_MERYL, 20000000, 0, 1);
	DropItem(II_WEA_WAN_NEFUME, 20000000, 0, 1);
	DropItem(II_WEA_STA_SHUPRIM, 20000000, 0, 1);
	DropItem(II_WEA_KNU_PAZION, 20000000, 0, 1);
	DropItem(II_WEA_AXE_GRABBER, 20000000, 0, 1);
	DropItem(II_ARM_ARM_SHI_BATTLE, 30000000, 0, 1);

	DropKind(IK3_SWD, 11, 18);
	DropKind(IK3_AXE, 11, 18);
	DropKind(IK3_CHEERSTICK, 11, 18);
	DropKind(IK3_KNUCKLEHAMMER, 11, 18);
	DropKind(IK3_WAND, 11, 18);
	DropKind(IK3_STAFF, 11, 18);
	DropKind(IK3_HELMET, 11, 18);
	DropKind(IK3_SUIT, 11, 18);
	DropKind(IK3_GAUNTLET, 11, 18);
	DropKind(IK3_BOOTS, 11, 18);
	DropKind(IK3_SHIELD, 11, 18);
	DropKind(IK3_BOW, 11, 18);
	DropKind(IK3_YOYO, 11, 18);

	DropItem(II_GEN_MAT_ELE_CYCLON, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_CYCLON, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropItem(II_GEN_GEM_GEM_SLAIN, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_SLAIN, 1000000000, 0, 1);
	DropItem(II_GEN_POT_DRI_VITAL200,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_SECOND, 420000000, 0, 1);
	DropItem(II_GEN_FOO_INS_BISCUIT, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_INS_BISCUIT, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_INS_BISCUIT, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_STRAWBERRYSHAKE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_STRAWBERRYSHAKE, 600000001, 0, 1);

	m_dwAttackMoveDelay = 0;
	m_dwRunawayDelay = 1000;
	SetRunAway( 20, MI_LAWOLF1, 3 );
	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                        Berserk 10 1.2            
                    }
		#move
		    {
			loot d 3
		    }	
   	}               
}
MI_FEFERN1
{
	Maxitem = 2;
	DropGold(28, 40);
	DropKind(IK3_SWD, 13, 17);
	DropKind(IK3_AXE, 13, 17);
	DropKind(IK3_CHEERSTICK, 13, 17);
	DropKind(IK3_KNUCKLEHAMMER, 13, 17);
	DropKind(IK3_WAND, 13, 17);
	DropKind(IK3_STAFF, 13, 17);
	DropKind(IK3_HELMET, 13, 17);
	DropKind(IK3_SUIT, 13, 17);
	DropKind(IK3_GAUNTLET, 13, 17);
	DropKind(IK3_BOOTS, 13, 17);
	DropKind(IK3_SHIELD, 13, 17);
	DropKind(IK3_BOW, 13, 17);
	DropKind(IK3_YOYO, 13, 17);

	DropItem(II_GEN_GEM_GEM_TARINROOT, 300000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack  
//                        evade 10            
                    }
		#move
		    {
			
		    }	
   	}               
}
MI_FEFERN2
{
	Maxitem = 2;
	DropGold(28, 40);
	DropKind(IK3_SWD, 13, 17);
	DropKind(IK3_AXE, 13, 17);
	DropKind(IK3_CHEERSTICK, 13, 17);
	DropKind(IK3_KNUCKLEHAMMER, 13, 17);
	DropKind(IK3_WAND, 13, 17);
	DropKind(IK3_STAFF, 13, 17);
	DropKind(IK3_HELMET, 13, 17);
	DropKind(IK3_SUIT, 13, 17);
	DropKind(IK3_GAUNTLET, 13, 17);
	DropKind(IK3_BOOTS, 13, 17);
	DropKind(IK3_SHIELD, 13, 17);
	DropKind(IK3_BOW, 13, 17);
	DropKind(IK3_YOYO, 13, 17);

	DropItem(II_GEN_GEM_GEM_TARINROOT, 200000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 20 cunning sam
                                    
                    }
		#move
		    {
			loot d 5
		    }	
   	}               
}
MI_FEFERN3
{
	Maxitem = 2;
	DropGold(28, 40);
	DropKind(IK3_SWD, 13, 17);
	DropKind(IK3_AXE, 13, 17);
	DropKind(IK3_CHEERSTICK, 13, 17);
	DropKind(IK3_KNUCKLEHAMMER, 13, 17);
	DropKind(IK3_WAND, 13, 17);
	DropKind(IK3_STAFF, 13, 17);
	DropKind(IK3_HELMET, 13, 17);
	DropKind(IK3_SUIT, 13, 17);
	DropKind(IK3_GAUNTLET, 13, 17);
	DropKind(IK3_BOOTS, 13, 17);
	DropKind(IK3_SHIELD, 13, 17);
	DropKind(IK3_BOW, 13, 17);
	DropKind(IK3_YOYO, 13, 17);

	DropItem(II_GEN_GEM_GEM_TARINROOT, 200000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning sam
//                        berserk 20 1.25           
                    }
		#move
		    {
			loot d 3
		    }	
   	}               
}
MI_FEFERN4
{
	Maxitem = 5;
	DropGold(207, 300);

	DropItem(II_GEN_JEW_NEC_HPNECKLACE, 20000000, 1, 1);
	DropItem(II_GEN_JEW_NEC_MPNECKLACE, 20000000, 3, 1);
	DropItem(II_WEA_SWO_KEHIN, 20000000, 0, 1);
	DropItem(II_WEA_CHEE_MERYL, 20000000, 0, 1);
	DropItem(II_WEA_WAN_NEFUME, 20000000, 0, 1);
	DropItem(II_WEA_STA_SHUPRIM, 20000000, 0, 1);
	DropItem(II_WEA_KNU_PAZION, 20000000, 0, 1);
	DropItem(II_WEA_AXE_GRABBER, 20000000, 0, 1);
	DropItem(II_ARM_ARM_SHI_BATTLE, 30000000, 0, 1);

	DropKind(IK3_SWD, 13, 20);
	DropKind(IK3_AXE, 13, 20);
	DropKind(IK3_CHEERSTICK, 13, 20);
	DropKind(IK3_KNUCKLEHAMMER, 13, 20);
	DropKind(IK3_WAND, 13, 20);
	DropKind(IK3_STAFF, 13, 20);
	DropKind(IK3_HELMET, 13, 20);
	DropKind(IK3_SUIT, 13, 20);
	DropKind(IK3_GAUNTLET, 13, 20);
	DropKind(IK3_BOOTS, 13, 20);
	DropKind(IK3_SHIELD, 13, 20);
	DropKind(IK3_BOW, 13, 20);
	DropKind(IK3_YOYO, 13, 20);

	DropItem(II_GEN_GEM_GEM_TARINROOT, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_TARINROOT, 1000000000, 0, 1);
	DropItem(II_GEN_POT_DRI_VITAL200,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_SECOND, 420000000, 0, 1);
	DropItem(II_GEN_FOO_COO_BARBECUE, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_BARBECUE, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_BARBECUE, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_STRAWBERRYSHAKE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_STRAWBERRYSHAKE, 600000001, 0, 1);

	DropItem(II_GEN_MAT_ELE_RIVER, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_RIVER, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                          
                                    
                    }
		#move
		    {
			loot d 3
		    }	
   	}               
}
MI_NYANGNYANG1
{
	Maxitem = 2;
	DropGold(28, 41);
	DropKind(IK3_SWD, 15, 19);
	DropKind(IK3_AXE, 15, 19);
	DropKind(IK3_CHEERSTICK, 15, 19);
	DropKind(IK3_KNUCKLEHAMMER, 15, 19);
	DropKind(IK3_WAND, 15, 19);
	DropKind(IK3_STAFF, 15, 19);
	DropKind(IK3_HELMET, 15, 19);
	DropKind(IK3_SUIT, 15, 19);
	DropKind(IK3_GAUNTLET, 15, 19);
	DropKind(IK3_BOOTS, 15, 19);
	DropKind(IK3_SHIELD, 15, 19);
	DropKind(IK3_BOW, 15, 19);
	DropKind(IK3_YOYO, 15, 19);


	DropItem(II_GEN_GEM_GEM_STARSTONE, 300000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning hi  
                        evade 10            
                    }
		#move
		    {
			
		    }	
   	}               
}
MI_NYANGNYANG2
{
	Maxitem = 2;
	DropGold(28, 41);
	DropKind(IK3_SWD, 15, 19);
	DropKind(IK3_AXE, 15, 19);
	DropKind(IK3_CHEERSTICK, 15, 19);
	DropKind(IK3_KNUCKLEHAMMER, 15, 19);
	DropKind(IK3_WAND, 15, 19);
	DropKind(IK3_STAFF, 15, 19);
	DropKind(IK3_HELMET, 15, 19);
	DropKind(IK3_SUIT, 15, 19);
	DropKind(IK3_GAUNTLET, 15, 19);
	DropKind(IK3_BOOTS, 15, 19);
	DropKind(IK3_SHIELD, 15, 19);
	DropKind(IK3_BOW, 15, 19);
	DropKind(IK3_YOYO, 15, 19);


	DropItem(II_GEN_GEM_GEM_STARSTONE, 200000000, 0, 1);

	m_dwAttackMoveDelay = 0;
	m_dwRunawayDelay = 1000;
	SetRunAway( 10, 0, 1 );
	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 30 cunning sam
                                    
                    }
		#move
		    {
			loot d 3
		    }	
   	}               
}
MI_NYANGNYANG3
{
	Maxitem = 2;
	DropGold(28, 41);
//	DropItem(II_ARM_ARM_SHI_FURY, 83320, 0, 1);   // world drop���� �ٲ�
	DropKind(IK3_SWD, 15, 19);
	DropKind(IK3_AXE, 15, 19);
	DropKind(IK3_CHEERSTICK, 15, 19);
	DropKind(IK3_KNUCKLEHAMMER, 15, 19);
	DropKind(IK3_WAND, 15, 19);
	DropKind(IK3_STAFF, 15, 19);
	DropKind(IK3_HELMET, 15, 19);
	DropKind(IK3_SUIT, 15, 19);
	DropKind(IK3_GAUNTLET, 15, 19);
	DropKind(IK3_BOOTS, 15, 19);
	DropKind(IK3_SHIELD, 15, 19);
	DropKind(IK3_BOW, 15, 19);	
	DropKind(IK3_YOYO, 15, 19);


	DropItem(II_GEN_GEM_GEM_STARSTONE, 200000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning sam
                        
                                    
                    }
		#move
		    {
			
		    }	
   	}               
}
MI_NYANGNYANG4
{
	Maxitem = 3;
	DropGold(212, 308);
	DropItem(II_WEA_SWO_ARKON, 30000000, 0, 1);
	DropItem(II_WEA_CHEE_GRIM, 30000000, 0, 1);
	DropItem(II_WEA_WAN_DIA, 30000000, 0, 1);
	DropItem(II_WEA_STA_VEGA, 30000000, 0, 1);
	DropItem(II_WEA_KNU_BABIL, 30000000, 0, 1);
	DropItem(II_WEA_AXE_KARHEM, 30000000, 0, 1);

	DropKind(IK3_SWD, 15, 22);
	DropKind(IK3_AXE, 15, 22);
	DropKind(IK3_CHEERSTICK, 15, 22);
	DropKind(IK3_KNUCKLEHAMMER, 15, 22);
	DropKind(IK3_WAND, 15, 22);
	DropKind(IK3_STAFF, 15, 22);
	DropKind(IK3_HELMET, 15, 22);
	DropKind(IK3_SUIT, 15, 22);
	DropKind(IK3_GAUNTLET, 15, 22);
	DropKind(IK3_BOOTS, 15, 22);
	DropKind(IK3_SHIELD, 15, 22);
	DropKind(IK3_BOW, 15, 22);
	DropKind(IK3_YOYO, 15, 22);

	DropItem(II_GEN_MAT_ELE_GENERATOR, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_GENERATOR, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropItem(II_GEN_GEM_GEM_STARSTONE, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_STARSTONE, 1000000000, 0, 1);
	DropItem(II_GEN_POT_DRI_VITAL200,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_SECOND, 420000000, 0, 1);
	DropItem(II_GEN_FOO_COO_BARBECUE, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_BARBECUE, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_BARBECUE, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_STRAWBERRYSHAKE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_STRAWBERRYSHAKE, 600000001, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                          
                        Berserk 20 1.4            
                    }
		#move
		    {
			loot d 3
		    }	
   	}               
}
MI_BANG1
{
	Maxitem = 2;
	DropGold(29, 42);
	DropKind(IK3_SWD, 17, 21);
	DropKind(IK3_AXE, 17, 21);
	DropKind(IK3_CHEERSTICK, 17, 21);
	DropKind(IK3_KNUCKLEHAMMER, 17, 21);
	DropKind(IK3_WAND, 17, 21);
	DropKind(IK3_STAFF, 17, 21);
	DropKind(IK3_HELMET, 17, 21);
	DropKind(IK3_SUIT, 17, 21);
	DropKind(IK3_GAUNTLET, 17, 21);
	DropKind(IK3_BOOTS, 17, 21);
	DropKind(IK3_SHIELD, 17, 21);
	DropKind(IK3_BOW, 17, 21);	
	DropKind(IK3_YOYO, 17, 21);


	DropItem(II_GEN_GEM_GEM_GOLDENWING, 300000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 30 cunning sam 
                                    
                    }
		#move
		    {
			loot d 4
		    }	
   	}               
}
MI_BANG2
{
	Maxitem = 2;
	DropGold(29, 42);
	DropKind(IK3_SWD, 17, 21);
	DropKind(IK3_AXE, 17, 21);
	DropKind(IK3_CHEERSTICK, 17, 21);
	DropKind(IK3_KNUCKLEHAMMER, 17, 21);
	DropKind(IK3_WAND, 17, 21);
	DropKind(IK3_STAFF, 17, 21);
	DropKind(IK3_HELMET, 17, 21);
	DropKind(IK3_SUIT, 17, 21);
	DropKind(IK3_GAUNTLET, 17, 21);
	DropKind(IK3_BOOTS, 17, 21);
	DropKind(IK3_SHIELD, 17, 21);
	DropKind(IK3_BOW, 17, 21);	
	DropKind(IK3_YOYO, 17, 21);


	DropItem(II_GEN_GEM_GEM_GOLDENWING, 200000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 10  
//                        berserk 20 1.2            
                    }
		#move
		    {
			
		    }	
   	}               
}
MI_BANG3
{
	Maxitem = 2;
	DropGold(29, 42);
	DropKind(IK3_SWD, 17, 21);
	DropKind(IK3_AXE, 17, 21);
	DropKind(IK3_CHEERSTICK, 17, 21);
	DropKind(IK3_KNUCKLEHAMMER, 17, 21);
	DropKind(IK3_WAND, 17, 21);
	DropKind(IK3_STAFF, 17, 21);
	DropKind(IK3_HELMET, 17, 21);
	DropKind(IK3_SUIT, 17, 21);
	DropKind(IK3_GAUNTLET, 17, 21);
	DropKind(IK3_BOOTS, 17, 21);
	DropKind(IK3_SHIELD, 17, 21);
	DropKind(IK3_BOW, 17, 21);	
	DropKind(IK3_YOYO, 17, 21);


	DropItem(II_GEN_GEM_GEM_GOLDENWING, 200000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning sam
                        
                        Evade 10            
                    }
		#move
		    {
			
		    }	
   	}               
}
MI_BANG4
{
	Maxitem = 5;
	DropGold(218, 316);
	DropItem(II_WEA_SWO_ARKON, 20000000, 0, 1);
	DropItem(II_WEA_CHEE_GRIM, 20000000, 0, 1);
	DropItem(II_WEA_WAN_DIA, 20000000, 0, 1);
	DropItem(II_WEA_STA_VEGA, 20000000, 0, 1);
	DropItem(II_WEA_KNU_BABIL, 20000000, 0, 1);
	DropItem(II_WEA_AXE_KARHEM, 20000000, 0, 1);
	DropItem(II_GEN_JEW_RIN_DEXRING, 30000000, 1, 1);
	DropItem(II_GEN_JEW_RIN_STARING, 30000000, 1, 1);

	DropKind(IK3_SWD, 17, 24);
	DropKind(IK3_AXE, 17, 24);
	DropKind(IK3_CHEERSTICK, 17, 24);
	DropKind(IK3_KNUCKLEHAMMER, 17, 24);
	DropKind(IK3_WAND, 17, 24);
	DropKind(IK3_STAFF, 17, 24);
	DropKind(IK3_HELMET, 17, 24);
	DropKind(IK3_SUIT, 17, 24);
	DropKind(IK3_GAUNTLET, 17, 24);
	DropKind(IK3_BOOTS, 17, 24);
	DropKind(IK3_SHIELD, 17, 24);
	DropKind(IK3_BOW, 17, 24);
	DropKind(IK3_YOYO, 17, 24);

	DropItem(II_GEN_MAT_ELE_DESERT, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_DESERT, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropItem(II_GEN_GEM_GEM_GOLDENWING, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_GOLDENWING, 1000000000, 0, 1);
	DropItem(II_GEN_POT_DRI_VITAL200,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_THIRD, 420000000, 0, 1);
	DropItem(II_GEN_FOO_COO_BARBECUE, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_BARBECUE, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_BARBECUE, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_STRAWBERRYSHAKE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_STRAWBERRYSHAKE, 600000001, 0, 1);

	m_dwAttackMoveDelay = 0;
	m_dwRunawayDelay = 1000;
	SetRunAway( 10, MI_BANG1, 2 );
	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                          
                                    
                    }
		#move
		    {
			loot d 3
		    }	
   	}               
}
MI_WAGSAAC1
{
	Maxitem = 2;
	DropGold(30, 44);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_GEM_GEM_BLUEHONEY, 300000000, 0, 1);
	
	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 20 cunning sam
                        keeprangeattack 6
            
                    }
		#move
		    {
			
		    }	
   	}               
}
MI_WAGSAAC2
{
	Maxitem = 2;
	DropGold(30, 44);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	
	DropItem(II_GEN_GEM_GEM_BLUEHONEY, 200000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning sam 
                                   
                    }
		#move
		    {
			
		    }	
   	}               
}
MI_WAGSAAC3
{
	Maxitem = 2;
	DropGold(30, 44);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_GEM_GEM_BLUEHONEY, 200000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low
                        
                        keeprangeattack 6
            
                    }
		#move
		    {
			loot d 4
		    }	
   	}               
}
MI_WAGSAAC4
{
	Maxitem = 5;
	DropGold(224, 324);

	DropKind(IK3_SWD, 19, 26);
	DropKind(IK3_AXE, 19, 26);
	DropKind(IK3_CHEERSTICK, 19, 26);
	DropKind(IK3_KNUCKLEHAMMER, 19, 26);
	DropKind(IK3_WAND, 19, 26);
	DropKind(IK3_STAFF, 19, 26);
	DropKind(IK3_HELMET, 19, 26);
	DropKind(IK3_SUIT, 19, 26);
	DropKind(IK3_GAUNTLET, 19, 26);
	DropKind(IK3_BOOTS, 19, 26);
	DropKind(IK3_SHIELD, 19, 26);
	DropKind(IK3_BOW, 19, 26);
	DropKind(IK3_YOYO, 19, 26);
	
	DropItem(II_GEN_MAT_ELE_RIVER, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_RIVER, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropItem(II_GEN_GEM_GEM_BLUEHONEY, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_BLUEHONEY, 1000000000, 0, 1);

	m_dwAttackMoveDelay = 0;
	m_dwRunawayDelay = 1000;
	SetRunAway( 10, 0, 1 );
	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                        
                        rangeattack 10            
                    }
		#move
		    {
			loot d 5
		    }	
   	}               
}
MI_MIA1
{
	Maxitem = 2;
	DropGold(31, 45);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_GEM_GEM_MIADOLL, 300000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack  
                        Berserk 50 1.2            
                    }
		#move
		    {
			
		    }	
   	}               
}
MI_MIA2
{
	Maxitem = 2;
	DropGold(31, 45);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	
	DropItem(II_GEN_GEM_GEM_MIADOLL, 200000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 30 cunning sam 
                                  
                    }
		#move
		    {
			loot d 3
		    }	
   	}               
}
MI_MIA3
{
	Maxitem = 2;
	DropGold(32, 46);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_GEM_GEM_MIADOLL, 200000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning sam
                        
                        Berserk 5 1.2            
                    }
		#move
		    {
			
		    }	
   	}               
}
MI_MIA4
{
	Maxitem = 5;
	DropGold(229, 332);

	DropItem(II_GEN_JEW_NEC_MPNECKLACE, 30000000, 7, 1);
	DropItem(II_GEN_JEW_NEC_FPNECKLACE, 30000000, 7, 1);
	DropItem(II_GEN_JEW_NEC_HPNECKLACE, 30000000, 3, 1);
	DropItem(II_WEA_SWO_ZIRKAN, 30000000, 0, 1);
	DropItem(II_WEA_CHEE_PAPANG, 30000000, 0, 1);
	DropItem(II_WEA_WAN_DAZZLE, 30000000, 0, 1);
	DropItem(II_WEA_STA_PAPANEW, 30000000, 0, 1);
	DropItem(II_WEA_KNU_PRENIL, 30000000, 0, 1);
	DropItem(II_WEA_AXE_CREST, 30000000, 0, 1);
	
	DropKind(IK3_SWD, 21, 28);
	DropKind(IK3_AXE, 21, 28);
	DropKind(IK3_CHEERSTICK, 21, 28);
	DropKind(IK3_KNUCKLEHAMMER, 21, 28);
	DropKind(IK3_WAND, 21, 28);
	DropKind(IK3_STAFF, 21, 28);
	DropKind(IK3_HELMET, 21, 28);
	DropKind(IK3_SUIT, 21, 28);
	DropKind(IK3_GAUNTLET, 21, 28);
	DropKind(IK3_BOOTS, 21, 28);
	DropKind(IK3_SHIELD, 21, 28);
	DropKind(IK3_BOW, 21, 28);
	DropKind(IK3_YOYO, 21, 28);

	DropItem(II_GEN_MAT_ELE_FLAME, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_FLAME, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropItem(II_GEN_GEM_GEM_MIADOLL, 200000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_MIADOLL, 200000000, 0, 1);
	DropItem(II_GEN_REF_REF_THIRD, 420000000, 0, 1);
	DropItem(II_GEN_FOO_INS_CHOCOLATE, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_INS_CHOCOLATE, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_INS_CHOCOLATE, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_PINEAPPLECONE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_PINEAPPLECONE, 600000001, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                        
                        berserk 30 1.2
			Evade 10            
                    }
		#move
		    { 
			loot d 5
		    }	
   	}               
}
MI_MRPUMPKIN1
{
	Maxitem = 2;
	DropGold(32, 46);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_GEM_GEM_FURIOUSMATCH, 300000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack  
                                    
                    }
		#move
		    {
			loot d 3
		    }	
   	}               
}
MI_MRPUMPKIN2
{
	Maxitem = 2;
	DropGold(32, 46);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_GEM_GEM_FURIOUSMATCH, 200000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			
			Keeprangeattack 8 
                                    
                    }
		#move
		    {
			
		    }	
   	}               
}
MI_MRPUMPKIN3
{
	Maxitem = 2;
	DropGold(32, 47);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_GEM_GEM_FURIOUSMATCH, 200000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low
                        
                                    
                    }
		#move
		    {
			
		    }	
   	}               
}
MI_MRPUMPKIN4
{
	Maxitem = 5;
	DropGold(240, 349);
	DropKind(IK3_SWD, 23, 30);
	DropKind(IK3_AXE, 23, 30);
	DropKind(IK3_CHEERSTICK, 23, 30);
	DropKind(IK3_KNUCKLEHAMMER, 23, 30);
	DropKind(IK3_WAND, 23, 30);
	DropKind(IK3_STAFF, 23, 30);
	DropKind(IK3_HELMET, 23, 30);
	DropKind(IK3_SUIT, 23, 30);
	DropKind(IK3_GAUNTLET, 23, 30);
	DropKind(IK3_BOOTS, 23, 30);
	DropKind(IK3_SHIELD, 23, 30);
	DropKind(IK3_BOW, 23, 30);
	DropKind(IK3_YOYO, 23, 30);

	DropItem(II_GEN_MAT_ELE_DESERT, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_DESERT, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropItem(II_GEN_GEM_GEM_FURIOUSMATCH, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_FURIOUSMATCH, 1000000000, 0, 1);
	DropItem(II_GEN_POT_DRI_VITAL300,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_FIFTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_COO_SEAFOODPANCAKE, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_SEAFOODPANCAKE, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_SEAFOODPANCAKE, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_PINEAPPLECONE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_PINEAPPLECONE, 600000001, 0, 1);

	m_nAttackFirstRange = 8;
	
	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                          
                                    
                    }
		#move
		    {
			loot d 2
		    }	
   	}               
}
MI_REDMANTIS1
{
	Maxitem = 2;
	DropGold(32, 47);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	
	DropItem(II_GEN_GEM_GEM_CARDRIN, 300000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 20 
                        Berserk 30 1.4            
                    }
		#move
		    {
			
		    }	
   	}               
}
MI_REDMANTIS2
{
	Maxitem = 2;
	DropGold(32, 47);
//	DropItem(II_ARM_ARM_SHI_HEAVY, 83320, 0, 1);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_GEM_GEM_CARDRIN, 200000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning sam 
                                    
                    }
		#move
		    {
			loot d 3
		    }	
   	}               
}
MI_REDMANTIS3
{
	Maxitem = 2;
	DropGold(33, 48);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_GEM_GEM_CARDRIN, 200000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 50 cunning sam
                                    
                    }
		#move
		    {
			loot d 4
		    }	
   	}               
}
MI_REDMANTIS4
{
	Maxitem = 5;
	DropGold(246, 357);

	DropKind(IK3_SWD, 25, 32);
	DropKind(IK3_AXE, 25, 32);
	DropKind(IK3_CHEERSTICK, 25, 32);
	DropKind(IK3_KNUCKLEHAMMER, 25, 32);
	DropKind(IK3_WAND, 25, 32);
	DropKind(IK3_STAFF, 25, 32);
	DropKind(IK3_HELMET, 25, 32);
	DropKind(IK3_SUIT, 25, 32);
	DropKind(IK3_GAUNTLET, 25, 32);
	DropKind(IK3_BOOTS, 25, 32);
	DropKind(IK3_SHIELD, 25, 32);
	DropKind(IK3_BOW, 25, 32);
	DropKind(IK3_YOYO, 25, 32);

	DropItem(II_GEN_MAT_ELE_CYCLON, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_CYCLON, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);
	
	DropItem(II_GEN_GEM_GEM_CARDRIN, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_CARDRIN, 1000000000, 0, 1);
	DropItem(II_GEN_POT_DRI_VITAL200,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_FOUTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_COO_SEAFOODPANCAKE, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_SEAFOODPANCAKE, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_SEAFOODPANCAKE, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_PINEAPPLECONE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_PINEAPPLECONE, 600000001, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                                                 
                        Berserk 10 1.2            
                    }
		#move
		    {
			loot d 5
		    }	
   	}               
}
MI_JACKTHEHAMMER1
{
	Maxitem = 2;
	DropGold(34, 49);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_GEM_GEM_HAMMARBLE, 300000000, 0, 1);

	m_nAttackFirstRange = 8;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 30  
                        evade 10            
                    }
		#move
		    {
			loot d 3
		    }	
   	}               
}
MI_JACKTHEHAMMER2
{
	Maxitem = 2;
	DropGold(34, 49);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);


	DropItem(II_GEN_GEM_GEM_HAMMARBLE, 200000000, 0, 1);


	

	m_nAttackFirstRange = 8;
	


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Keeprangeattack 8 
                        evade 20            
                    }
		#move
		    {
			loot d 4
		    }	
   	}               
}
MI_JACKTHEHAMMER3
{
	Maxitem = 2;
	DropGold(34, 49);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);


	DropItem(II_GEN_GEM_GEM_HAMMARBLE, 200000000, 0, 1);


	

	m_nAttackFirstRange = 8;



	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low
                        
                                    
                    }
		#move
		    {
			
		    }	
   	}               
}
MI_JACKTHEHAMMER4
{
	Maxitem = 5;
	DropGold(252, 365);

	DropItem(II_GEN_JEW_NEC_HPNECKLACE, 30000000, 4, 1);
	DropItem(II_GEN_JEW_RIN_DEXRING,    30000000, 2, 1);
	DropItem(II_GEN_JEW_RIN_STARING,    30000000, 3, 1);

	DropKind(IK3_SWD, 27, 34);
	DropKind(IK3_AXE, 27, 34);
	DropKind(IK3_CHEERSTICK, 27, 34);
	DropKind(IK3_KNUCKLEHAMMER, 27, 34);
	DropKind(IK3_WAND, 27, 34);
	DropKind(IK3_STAFF, 27, 34);
	DropKind(IK3_HELMET, 27, 34);
	DropKind(IK3_SUIT, 27, 34);
	DropKind(IK3_GAUNTLET, 27, 34);
	DropKind(IK3_BOOTS, 27, 34);
	DropKind(IK3_SHIELD, 27, 34);
	DropKind(IK3_BOW, 27, 34);
	DropKind(IK3_YOYO, 27, 34);

	DropItem(II_GEN_MAT_ELE_GENERATOR, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_GENERATOR, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropItem(II_GEN_GEM_GEM_HAMMARBLE, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_HAMMARBLE, 1000000000, 0, 1);

	DropItem(II_GEN_POT_DRI_VITAL300,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_FOUTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_COO_SEAFOODPANCAKE, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_SEAFOODPANCAKE, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_SEAFOODPANCAKE, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_PINEAPPLECONE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_PINEAPPLECONE, 600000001, 0, 1);

	

	m_nAttackFirstRange = 8;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                          
                                    
                    }
		#move
		    {
			loot d 3
		    }	
   	}               
}

MI_GIGGLEBOX1
{
	Maxitem = 2;
	DropGold(35, 51);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	
	DropItem(II_GEN_GEM_GEM_GIGGLANDE, 300000000, 0, 1);


	

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 30 cunning sam 
                                    
                    }
		#move
		    {
			loot d 3
		    }	
   	}               
}
MI_GIGGLEBOX2
{
	Maxitem = 2;
	DropGold(35, 51);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_GEM_GEM_GIGGLANDE, 200000000, 0, 1);


	

	m_nAttackFirstRange = 8;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 50 
                                    
                    }
		#move
		    {
			loot d 3
		    }	
   	}               
}
MI_GIGGLEBOX3
{
	Maxitem = 2;
	DropGold(36, 52);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_GEM_GEM_GIGGLANDE, 200000000, 0, 1);


	

	m_nAttackFirstRange = 8;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low
                        
                                    
                    }
		#move
		    {

		    }
	}
			
	               

}
MI_GIGGLEBOX4
{
	Maxitem = 4;
	DropGold(263, 381);

	DropItem(II_GEN_JEW_RIN_STRRING, 30000000, 3, 1);
	DropItem(II_GEN_JEW_RIN_INTRING, 30000000, 3, 1);

	DropKind(IK3_SWD, 29, 36);
	DropKind(IK3_AXE, 29, 36);
	DropKind(IK3_CHEERSTICK, 29, 36);
	DropKind(IK3_KNUCKLEHAMMER, 29, 36);
	DropKind(IK3_WAND, 29, 36);
	DropKind(IK3_STAFF, 29, 36);
	DropKind(IK3_HELMET, 29, 36);
	DropKind(IK3_SUIT, 29, 36);
	DropKind(IK3_GAUNTLET, 29, 36);
	DropKind(IK3_BOOTS, 29, 36);
	DropKind(IK3_SHIELD, 29, 36);
	DropKind(IK3_BOW, 29, 36);
	DropKind(IK3_YOYO, 29, 36);

	DropItem(II_GEN_MAT_ELE_DESERT, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_DESERT, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropItem(II_GEN_GEM_GEM_GIGGLANDE, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_GIGGLANDE, 1000000000, 0, 1);

	DropItem(II_GEN_POT_DRI_VITAL300,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_FOUTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_INS_MILK, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_INS_MILK, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_INS_MILK, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_BANANAJUJUBAR, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_BANANAJUJUBAR, 600000001, 0, 1);

	
	m_nAttackFirstRange = 8;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                          
                                    
                    }
		#move
		    {
			
		    }	
   	}               
}
MI_ROCKMUSCLE1
{
	Maxitem = 2;
	DropGold(36, 52);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);


	DropItem(II_GEN_GEM_GEM_MOONSTONE, 300000000, 0, 1);

	

	m_nAttackFirstRange = 8;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 50 
                                    
                    }
		#move
		    {
			
		    }	
   	}               
}
MI_ROCKMUSCLE2
{
	Maxitem = 2;
	DropGold(36, 52);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);


	DropItem(II_GEN_GEM_GEM_MOONSTONE, 200000000, 0, 1);

	
	m_nAttackFirstRange = 8;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 30 cunning hi 
                                    
                    }
		#move
		    {
			loot d 3
		    }	
   	}               
}
MI_ROCKMUSCLE3
{
	Maxitem = 2;
	DropGold(36, 53);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);


	DropItem(II_GEN_GEM_GEM_MOONSTONE, 200000000, 0, 1);

	

	m_nAttackFirstRange = 8;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low
                        
                        berserk 20 1.4            
                    }
		#move
		    {
			loot d 4
		    }	
   	}               
}
MI_ROCKMUSCLE4
{
	Maxitem = 5;
	DropGold(268, 389);

	DropItem(II_GEN_JEW_NEC_MPNECKLACE, 30000000, 11, 1);
	DropItem(II_GEN_JEW_NEC_FPNECKLACE, 30000000, 11, 1);
	DropItem(II_WEA_SWO_STRAD, 30000000, 0, 1);
	DropItem(II_WEA_CHEE_DAIN, 30000000, 0, 1);
	DropItem(II_WEA_WAN_PENY , 30000000, 0, 1);
	DropItem(II_WEA_STA_PINSI, 30000000, 0, 1);
	DropItem(II_WEA_KNU_SALAMANDER, 30000000, 0, 1);
	DropItem(II_WEA_AXE_CANINE, 	30000000, 0, 1);

	DropKind(IK3_SWD, 31, 38);
	DropKind(IK3_AXE, 31, 38);
	DropKind(IK3_CHEERSTICK, 31, 38);
	DropKind(IK3_KNUCKLEHAMMER, 31, 38);
	DropKind(IK3_WAND, 31, 38);
	DropKind(IK3_STAFF, 31, 38);
	DropKind(IK3_HELMET, 31, 38);
	DropKind(IK3_SUIT, 31, 38);
	DropKind(IK3_GAUNTLET, 31, 38);
	DropKind(IK3_BOOTS, 31, 38);
	DropKind(IK3_SHIELD, 31, 38);
	DropKind(IK3_BOW, 31, 38);
	DropKind(IK3_YOYO, 31, 38);

	DropItem(II_GEN_MAT_ELE_FLAME, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_FLAME, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropItem(II_GEN_GEM_GEM_MOONSTONE, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_MOONSTONE, 1000000000, 0, 1);

	DropItem(II_GEN_POT_DRI_VITAL400,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_FOUTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_INS_MILK, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_INS_MILK, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_INS_MILK, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_BANANAJUJUBAR, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_BANANAJUJUBAR, 600000001, 0, 1);

	

	m_nAttackFirstRange = 8;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                        
                                    
                    }
		#move
		    {
			loot d 3
             	    }
	}	               

}

MI_BIGMUSCLE
{
	Maxitem = 25;
	DropGold(36, 52);

	DropItem(II_GEN_MAT_ORICHALCUM01, 7500000, 0, 1);

	DropItem(II_GEN_GEM_GEM_TWINKLESTONE, 1800000000, 0, 1);	//	������
	DropItem(II_GEN_GEM_GEM_FORFORM, 1800000000, 0, 1);		//	��������
	DropItem(II_GEN_GEM_GEM_PALIN, 1800000000, 0, 1);		//	�ȸ�
	DropItem(II_GEN_GEM_GEM_CHUPIM, 1800000000, 0, 1);		//	����
	DropItem(II_GEN_GEM_GEM_PEAKYRIND, 1800000000, 0, 1);		//	��Ű���ε�
	DropItem(II_GEN_GEM_GEM_MOP, 1800000000, 0, 1);			//	����
	DropItem(II_GEN_GEM_GEM_POPORAM, 1800000000, 0, 1);		//	������
	DropItem(II_GEN_GEM_GEM_SLAIN, 1800000000, 0, 1);		//	������
	DropItem(II_GEN_GEM_GEM_TARINROOT, 1800000000, 0, 1);		//	Ÿ���Ѹ�
	DropItem(II_GEN_GEM_GEM_STARSTONE, 1800000000, 0, 1);		//	����
	DropItem(II_GEN_GEM_GEM_GOLDENWING, 1800000000, 0, 1);		//	Ȳ�ݳ���
	DropItem(II_GEN_GEM_GEM_BLUEHONEY, 1800000000, 0, 1);		//	�������
	DropItem(II_GEN_GEM_GEM_MIADOLL, 1800000000, 0, 1);		//	�̾��� ����
	DropItem(II_GEN_GEM_GEM_FURIOUSMATCH, 1800000000, 0, 1);	//	��ȭ����
	DropItem(II_GEN_GEM_GEM_CARDRIN, 1800000000, 0, 1);		//	ī�帰
	DropItem(II_GEN_GEM_GEM_HAMMARBLE, 1800000000, 0, 1);		//	�ܸ���
	DropItem(II_GEN_GEM_GEM_GIGGLANDE, 1800000000, 0, 1);		//	��۷���
	DropItem(II_GEN_GEM_GEM_MOONSTONE, 1800000000, 0, 1);		//	���弮
	DropItem(II_GEN_GEM_GEM_BOBAND, 1800000000, 0, 1);		//	������
	DropItem(II_GEN_GEM_GEM_DUMBLING, 1800000000, 0, 1);		//	������


	DropItem(II_GEN_MAT_ELE_CANDLE, 15000000, 0, 1);		//	ĵ�� ī��
	DropItem(II_GEN_MAT_ELE_RAIN, 15000000, 0, 1);			//	���� ī��
	DropItem(II_GEN_MAT_ELE_BREEZE, 15000000, 0, 1);		//	�긮�� ī��
	DropItem(II_GEN_MAT_ELE_SPARK, 14500000, 0, 1);		        //	����ũ ī��
	DropItem(II_GEN_MAT_ELE_FLAME, 14500000, 0, 1);		        //	��ġ ī��
	DropItem(II_GEN_MAT_ELE_RIVER, 14500000, 0, 1);			//	����ũ ī��
	DropItem(II_GEN_MAT_ELE_GENERATOR, 14500000, 0, 1);		//	�������� ī��
	DropItem(II_GEN_MAT_ELE_DESERT, 14500000, 0, 1);	        	//	���� ī��

	DropItem(II_WEA_SWO_OUTLAW, 50000000, 0, 1);	        	//	�ƿ��μҵ�
	DropItem(II_WEA_SWO_FAIRSLENDER, 45000000, 0, 1);		//	�������ҵ�
	DropItem(II_WEA_SWO_TAO, 35000000, 0, 1);       		//	Ÿ���ҵ�(������ �������� �����)
	DropItem(II_WEA_WAN_EPI, 50000000, 0, 1);			//	���ǿϵ�
	DropItem(II_WEA_WAN_NIZ, 45000000, 0, 1);			//	����ϵ�
	DropItem(II_WEA_WAN_KALIS, 35000000, 0, 1);		        //	Į�����ϵ�(������ �������� �����)
	DropItem(II_WEA_CHEE_HUEY, 50000000, 0, 1);	        	//	���̽�ƽ
	DropItem(II_WEA_CHEE_KUDOS, 45000000, 0, 1);			//	ť������ƽ
	DropItem(II_WEA_CHEE_SAINT, 35000000, 0, 1);	         	//	����Ʈ��ƽ(������ �������� �����)
	DropItem(II_WEA_AXE_BRONZE, 50000000, 0, 1);			//	������
	DropItem(II_WEA_AXE_GRANG, 45000000, 0, 1);			//	�׶�����
	DropItem(II_WEA_AXE_PROEM, 35000000, 0, 1);	         	//      ���ο�����(������ �������� �����)
	DropItem(II_WEA_STA_INNER, 50000000, 0, 1);			//	�γʽ�����
	DropItem(II_WEA_STA_HERALD, 45000000, 0, 1);			//	�ط��彺����
	DropItem(II_WEA_STA_SIGN, 35000000, 0, 1);			//	���ν�����(������ �������� �����)
	DropItem(II_WEA_KNU_TWIT, 50000000, 0, 1);			//	Ʈ����Ŭ
	DropItem(II_WEA_KNU_XENO, 45000000, 0, 1);			//	�����Ŭ
	DropItem(II_WEA_KNU_TALIN, 35000000, 0, 1);			//	Ż����Ŭ(������ �������� �����)
	DropItem(II_WEA_YOY_CLIENT, 50000000, 0, 1);			//	Ŭ���̾�Ʈ
	DropItem(II_WEA_YOY_TENSU, 45000000, 0, 1);	       		//	�ټ�
	DropItem(II_WEA_YOY_DICEIN, 35000000, 0, 1);			//	����(������ �������� �����)
	DropItem(II_WEA_BOW_STIENG, 50000000, 0, 1);			//	��Ƽ�����
	DropItem(II_WEA_BOW_CLASEM, 45000000, 0, 1);	       		//	Ŭ������Ʈ����(������ �������� �����)
	DropItem(II_WEA_BOW_CRISTI, 35000000, 0, 1);			//	ũ����Ƽ�ƺ���

	DropItem(II_ARM_M_MER_HELMET0101, 70000000, 0, 1);		//	��ƽ ���
	DropItem(II_ARM_M_MER_SUIT0101, 60000000, 0, 1);		//	��ƽ ��Ʈ
	DropItem(II_ARM_M_MER_GAUNTLET0101, 70000000, 0, 1);		//	��ƽ ��Ʋ��
	DropItem(II_ARM_M_MER_BOOTS0101, 70000000, 0, 1);		//	��ƽ ����
	DropItem(II_ARM_M_MER_HELMET0201, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_M_MER_SUIT0201, 60000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_M_MER_GAUNTLET0201, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_M_MER_BOOTS0201, 80000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_F_MER_HELMET0101, 70000000, 0, 1);		//	������Ʈ ���
	DropItem(II_ARM_F_MER_SUIT0101, 60000000, 0, 1);		//	������Ʈ ��Ʈ
	DropItem(II_ARM_F_MER_GAUNTLET0101, 80000000, 0, 1);		//	������Ʈ ��Ʋ��
	DropItem(II_ARM_F_MER_BOOTS0101, 70000000, 0, 1);		//	������Ʈ ����
	DropItem(II_ARM_F_MER_HELMET0201, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_F_MER_SUIT0201, 60000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_F_MER_GAUNTLET0201, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_F_MER_BOOTS0201, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_M_MAG_HELMET0101, 70000000, 0, 1);		//	���̽� ���
	DropItem(II_ARM_M_MAG_SUIT0101, 60000000, 0, 1);		//	���̽� ��Ʈ
	DropItem(II_ARM_M_MAG_GAUNTLET0101, 70000000, 0, 1);		//	���̽� ��Ʋ��
	DropItem(II_ARM_M_MAG_BOOTS0101, 70000000, 0, 1);		//	���̽� ����
	DropItem(II_ARM_M_MAG_HELMET0201, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_M_MAG_SUIT0201, 60000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_M_MAG_GAUNTLET0201, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_M_MAG_BOOTS0201, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_F_MAG_HELMET0101, 70000000, 0, 1);		//	�轺 ���
	DropItem(II_ARM_F_MAG_SUIT0101, 60000000, 0, 1);		//	�轺 ��Ʈ
	DropItem(II_ARM_F_MAG_GAUNTLET0101, 70000000, 0, 1);		//	�轺 ��Ʋ��
	DropItem(II_ARM_F_MAG_BOOTS0101, 70000000, 0, 1);		//	�轺 ����
	DropItem(II_ARM_F_MAG_HELMET0201, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_F_MAG_SUIT0201, 60000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_F_MAG_GAUNTLET0201, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_F_MAG_BOOTS0201, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_M_ASS_SUIT0101, 60000000, 0, 1);		//	�긮�� ��Ʈ
	DropItem(II_ARM_M_ASS_GAUNTLET0101, 70000000, 0, 1);		//	�긮�� ��Ʋ��
	DropItem(II_ARM_M_ASS_BOOTS0101, 70000000, 0, 1);		//	�긮�� ����
	DropItem(II_ARM_M_ASS_HELMET0201, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_M_ASS_SUIT0201, 60000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_M_ASS_GAUNTLET0201, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_M_ASS_BOOTS0201, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_F_ASS_HELMET0101, 70000000, 0, 1);		//	�÷ζ� ���
	DropItem(II_ARM_F_ASS_SUIT0101, 60000000, 0, 1);		//	�÷ζ� ��Ʈ
	DropItem(II_ARM_F_ASS_GAUNTLET0101, 70000000, 0, 1);		//	�÷ζ� ��Ʋ��
	DropItem(II_ARM_F_ASS_BOOTS0101, 70000000, 0, 1);		//	�÷ζ� ����
	DropItem(II_ARM_F_ASS_HELMET0201, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_F_ASS_SUIT0201, 60000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_F_ASS_GAUNTLET0201, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_F_ASS_BOOTS0201, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_M_ACR_HELMET0101, 70000000, 0, 1);		//	�ó� ���
	DropItem(II_ARM_M_ACR_SUIT0101, 60000000, 0, 1);		//	�ó� ��Ʈ
	DropItem(II_ARM_M_ACR_GAUNTLET0101, 70000000, 0, 1);		//	�ó� ��Ʋ��
	DropItem(II_ARM_M_ACR_BOOTS0101, 70000000, 0, 1);		//	�ó� ����
	DropItem(II_ARM_M_ACR_HELMET0201, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_M_ACR_SUIT0201, 60000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_M_ACR_GAUNTLET0201, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_M_ACR_BOOTS0201, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_F_ACR_HELMET0101, 70000000, 0, 1);		//	�þ��� ���
	DropItem(II_ARM_F_ACR_SUIT0101, 60000000, 0, 1);		//	�þ��� ��Ʈ
	DropItem(II_ARM_F_ACR_GAUNTLET0101, 70000000, 0, 1);		//	�þ��� ��Ʋ��
	DropItem(II_ARM_F_ACR_BOOTS0101, 70000000, 0, 1);		//	�þ��� ����
        DropItem(II_ARM_F_ACR_HELMET0201, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_F_ACR_SUIT0201, 60000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_F_ACR_GAUNTLET0201, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_F_ACR_BOOTS0201, 70000000, 0, 1);		//	(������ �������� �����)

	DropItem(II_ARM_ARM_SHI_SPARKLE, 20000000, 0, 1);		//	����Ŭ �ǵ�
	DropItem(II_ARM_ARM_SHI_SHURAIN, 15000000, 0, 1);	        //	������ �ǵ�(������ �������� �����)

	DropItem(II_GEN_FOO_COO_BARBECUE, 3000000000, 0, 1);		//	�ٺ�ť
	DropItem(II_GEN_FOO_COO_SEAFOODPANCAKE, 3000000000, 0, 1);	//	�ع�����
	DropItem(II_GEN_FOO_ICE_PINEAPPLECONE, 3000000000, 0, 1);	//	���ξ�����
	DropItem(II_GEN_FOO_ICE_BANANAJUJUBAR, 3000000000, 0, 1);	//	�ٳ������޹�
	DropItem(II_GEN_REF_REF_SECOND, 3000000000, 0, 1);		//	�������� 2��
	DropItem(II_GEN_REF_REF_THIRD, 30000000000, 0, 1);		//	�������� 3��
	DropItem(II_GEN_REF_REF_FOUTH, 3000000000, 0, 1);		//	�������� 4��
	DropItem(II_GEN_POT_DRI_VITAL200, 3000000000, 0, 1);		//	Ȱ�µ帵ũ 200
	DropItem(II_GEN_POT_DRI_VITAL300, 3000000000, 0, 1);		//	Ȱ�µ帵ũ 300
	DropItem(II_GEN_POT_DRI_VITAL400, 3000000000, 0, 1);		//	Ȱ�µ帵ũ 400
	DropItem(II_GEN_POT_POT_CUREDISEASE, 3000000000, 0, 1);		//	����ġ���
	DropItem(II_GEN_POT_POT_ANTIDOTE, 3000000000, 0, 1);		//	�ص���


	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan 
                    }
		#battle
		    {
			Attack
			Berserk 30 2
                        recovery 5 20 100 m                                               
                    }
		#move
		    {

		    }	
   	}               
}




MI_HOBO1
{
	Maxitem = 2;
	DropGold(37, 54);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_GEM_GEM_BOBAND, 300000000, 0, 1);


	

	m_nAttackFirstRange = 8;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 20 cunning sam 
                        rangeattack 10
			Evade 20            
                    }
		#move
		    {
			loot d 5
		    }	
   	}               
}
MI_HOBO2
{
	Maxitem = 2;
	DropGold(37, 54);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);


	DropItem(II_GEN_GEM_GEM_BOBAND, 200000000, 0, 1);


	
	m_nAttackFirstRange = 8;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Keeprangeattack 8
                        evade 10
			           
                    }
		#move
		    {
			loot d 3
		    }	
   	}               
}
MI_HOBO3
{
	Maxitem = 2;
	DropGold(37, 54);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_GEM_GEM_BOBAND, 200000000, 0, 1);


	

	m_nAttackFirstRange = 8;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                        
                        Berserk 30 1.4            
                    }
		#move
		    {
			loot d 3
		    }	
   	}               
}
MI_HOBO4
{
	Maxitem = 5;
	DropGold(280, 406);

	DropKind(IK3_SWD, 33, 40);
	DropKind(IK3_AXE, 33, 40);
	DropKind(IK3_CHEERSTICK, 33, 40);
	DropKind(IK3_KNUCKLEHAMMER, 33, 40);
	DropKind(IK3_WAND, 33, 40);
	DropKind(IK3_STAFF, 33, 40);
	DropKind(IK3_HELMET, 33, 40);
	DropKind(IK3_SUIT, 33, 40);
	DropKind(IK3_GAUNTLET, 33, 40);
	DropKind(IK3_BOOTS, 33, 40);
	DropKind(IK3_SHIELD, 33, 40);
	DropKind(IK3_BOW, 33, 40);
	DropKind(IK3_YOYO, 33, 40);

	DropItem(II_GEN_MAT_ELE_RIVER, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_RIVER, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropItem(II_GEN_GEM_GEM_BOBAND, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_BOBAND, 1000000000, 0, 1);

	DropItem(II_GEN_POT_DRI_VITAL400,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_FOUTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_COO_FISHSOUP, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_FISHSOUP, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_FISHSOUP, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_BANANAJUJUBAR, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_BANANAJUJUBAR, 600000001, 0, 1);

	

	m_nAttackFirstRange = 8;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                          
                                    
                    }
		#move
		    {
			loot d 4
		    }	
   	}               
}

MI_DUMBBULL1
{
	Maxitem = 2;
	DropGold(38, 55);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);


	DropItem(II_GEN_GEM_GEM_DUMBLING, 300000000, 0, 1);


	
	m_nAttackFirstRange = 8;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 10 cunning sam 
                        berserk 20 1.2            
                    }
		#move
		    {
			loot d 5
		    }	
   	}               
}
MI_DUMBBULL2
{
	Maxitem = 2;
	DropGold(38, 55);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	
	DropItem(II_GEN_GEM_GEM_DUMBLING, 200000000, 0, 1);


	
	
	m_nAttackFirstRange = 8;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning sam 
                                    
                    }
		#move
		    {
			
		    }	
   	}               
}
MI_DUMBBULL3
{
	Maxitem = 2;
	DropGold(39, 56);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);


	DropItem(II_GEN_GEM_GEM_DUMBLING, 200000000, 0, 1);


	

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low
                        
                                    
                    }
		#move
		    {
			
		    }	
   	}               
}
MI_DUMBBULL4
{
	Maxitem = 5;
	DropGold(285, 414);

	DropKind(IK3_SWD, 35, 42);
	DropKind(IK3_AXE, 35, 42);
	DropKind(IK3_CHEERSTICK, 35, 42);
	DropKind(IK3_KNUCKLEHAMMER, 35, 42);
	DropKind(IK3_WAND, 35, 42);
	DropKind(IK3_STAFF, 35, 42);
	DropKind(IK3_HELMET, 35, 42);
	DropKind(IK3_SUIT, 35, 42);
	DropKind(IK3_GAUNTLET, 35, 42);
	DropKind(IK3_BOOTS, 35, 42);
	DropKind(IK3_SHIELD, 35, 42);
	DropKind(IK3_BOW, 35, 42);
	DropKind(IK3_YOYO, 35, 42);

	DropItem(II_GEN_MAT_ELE_DESERT, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_DESERT, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropItem(II_GEN_GEM_GEM_DUMBLING, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_DUMBLING, 1000000000, 0, 1);

	DropItem(II_GEN_POT_DRI_VITAL400,  110000000, 0, 1);
	DropItem(II_GEN_FOO_COO_FISHSOUP, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_FISHSOUP, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_FISHSOUP, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_BANANAJUJUBAR, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_BANANAJUJUBAR, 600000001, 0, 1);

	

	m_nAttackFirstRange = 8;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                          
                                    
                    }
		#move
		    {
			loot d 3
		    }	
   	}     
}
MI_TOTEMIA1
{
	Maxitem = 2;
	DropGold(40, 58);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);


	DropItem(II_GEN_GEM_GEM_KALIN, 300000000, 0, 1);


	

	m_nAttackFirstRange = 8;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 20 cunning sam 
                                    
                    }
		#move
		    {
			loot d 2
		    }	
   	}               
}
MI_TOTEMIA2
{
	Maxitem = 2;
	DropGold(40, 58);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);


	DropItem(II_GEN_GEM_GEM_KALIN, 200000000, 0, 1);


	

	m_nAttackFirstRange = 8;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 20 cunning hi
                        Berserk 20 1.4            
                    }
		#move
		    {
			
		    }	
   	}               
}
MI_TOTEMIA3
{
	Maxitem = 2;
	DropGold(40, 58);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);


	DropItem(II_GEN_GEM_GEM_KALIN, 200000000, 0, 1);


	

	m_nAttackFirstRange = 8;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                                   
                    }
		#move
		    {
			
		    }	
   	}               
}
MI_TOTEMIA4
{
	Maxitem = 4;
	DropGold(296, 430);

	DropItem(II_GEN_JEW_RIN_DEXRING, 30000000, 3, 1);
	DropItem(II_GEN_JEW_RIN_STARING, 30000000, 3, 1);
	DropItem(II_WEA_SWO_SIBAK, 30000000, 0, 1);
	DropItem(II_WEA_CHEE_SEPHY, 30000000, 0, 1);
	DropItem(II_WEA_WAN_SPLHAIL, 30000000, 0, 1);
	DropItem(II_WEA_STA_LEAFGALE, 30000000, 0, 1);
	DropItem(II_WEA_KNU_GIGATON, 30000000, 0, 1);
	DropItem(II_WEA_AXE_CRAWLER, 30000000, 0, 1);

	DropKind(IK3_SWD, 37, 44);
	DropKind(IK3_AXE, 37, 44);
	DropKind(IK3_CHEERSTICK, 37, 44);
	DropKind(IK3_KNUCKLEHAMMER, 37, 44);
	DropKind(IK3_WAND, 37, 44);
	DropKind(IK3_STAFF, 37, 44);
	DropKind(IK3_HELMET, 37, 44);
	DropKind(IK3_SUIT, 37, 44);
	DropKind(IK3_GAUNTLET, 37, 44);
	DropKind(IK3_BOOTS, 37, 44);
	DropKind(IK3_SHIELD, 37, 44);
	DropKind(IK3_BOW, 37, 44);
	DropKind(IK3_YOYO, 37, 44);

	DropItem(II_GEN_MAT_ELE_GENERATOR, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_GENERATOR, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropItem(II_GEN_GEM_GEM_KALIN, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_KALIN, 1000000000, 0, 1);

	DropItem(II_GEN_POT_DRI_VITAL400,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_FIFTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_INS_BREAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_INS_BREAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_INS_BREAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_FRUITJUICE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_FRUITJUICE, 600000001, 0, 1);

	

	m_nAttackFirstRange = 8;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                          
                                    
                    }
		#move
		    {
			loot d 3
		    }	
   	}               
}
MI_CARDPUPPET1
{
	Maxitem = 2;
	DropGold(40, 59);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);


	DropItem(II_GEN_GEM_GEM_CLOCKHEART, 300000000, 0, 1);


	

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning sam 
                                    
                    }
		#move
		    {
			
		    }	
   	}               
}
MI_CARDPUPPET2
{
	Maxitem = 2;
	DropGold(40, 59);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);


	DropItem(II_GEN_GEM_GEM_CLOCKHEART, 200000000, 0, 1);


	

	m_nAttackFirstRange = 8;



	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Keeprangeattack 8 
                        Evade 20            
                    }
		#move
		    {
			loot d 2
		    }	
   	}               
}
MI_CARDPUPPET3
{
	Maxitem = 2;
	DropGold(41, 60);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);


	DropItem(II_GEN_GEM_GEM_CLOCKHEART, 200000000, 0, 1);


	

	m_nAttackFirstRange = 8;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low
                        
                        Evade 10            
                    }
		#move
		    {
			
		    }	
   	}               
}
MI_CARDPUPPET4
{
	Maxitem = 5;
	DropGold(302, 438);
	DropItem(II_GEN_JEW_RIN_STRRING, 30000000, 3, 1);
	DropItem(II_GEN_JEW_RIN_INTRING, 30000000, 3, 1);
	
	DropItem(II_GEN_MAT_ELE_FLAME, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_FLAME, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropKind(IK3_SWD, 39, 46);
	DropKind(IK3_AXE, 39, 46);
	DropKind(IK3_CHEERSTICK, 39, 46);
	DropKind(IK3_KNUCKLEHAMMER, 39, 46);
	DropKind(IK3_WAND, 39, 46);
	DropKind(IK3_STAFF, 39, 46);
	DropKind(IK3_HELMET, 39, 46);
	DropKind(IK3_SUIT, 39, 46);
	DropKind(IK3_GAUNTLET, 39, 46);
	DropKind(IK3_BOOTS, 39, 46);
	DropKind(IK3_SHIELD, 39, 46);
	DropKind(IK3_BOW, 39, 46);
	DropKind(IK3_YOYO, 39, 46);

	DropItem(II_GEN_GEM_GEM_CLOCKHEART, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_CLOCKHEART, 1000000000, 0, 1);

	DropItem(II_GEN_POT_DRI_VITAL400,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_SIXTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_INS_BREAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_INS_BREAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_INS_BREAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_FRUITJUICE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_FRUITJUICE, 600000001, 0, 1);

	

	m_nAttackFirstRange = 8;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                          
                                    
                    }
		#move
		    {
			
		    }	
   	}               
}
MI_TOMBSTONEBEARER1
{
	Maxitem = 2;
	DropGold(42, 61);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);


	DropItem(II_GEN_GEM_GEM_TOMBMARBLE, 300000000, 0, 1);


	

	m_nAttackFirstRange = 8;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning sam 
                                    
                    }
		#move
		    {
			loot d 4
		    }	
   	}               
}
MI_TOMBSTONEBEARER2
{
	Maxitem = 2;
	DropGold(42, 61);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	

	DropItem(II_GEN_GEM_GEM_TOMBMARBLE, 200000000, 0, 1);


	

	m_nAttackFirstRange = 8;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                        berserk 20 1.5            
                    }
		#move
		    {
			
		    }	
   	}               
}
MI_TOMBSTONEBEARER3
{
	Maxitem = 2;
	DropGold(42, 61);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_GEM_GEM_TOMBMARBLE, 200000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low
                        
                                    
                    }
		#move
		    {
			
		    }	
   	}               
}
MI_TOMBSTONEBEARER4
{
	Maxitem = 5;
	DropGold(313, 454);

	DropItem(II_GEN_JEW_NEC_HPNECKLACE, 30000000, 5, 1);
	DropItem(II_GEN_JEW_NEC_FPNECKLACE, 30000000, 14, 1);
	DropItem(II_GEN_JEW_NEC_MPNECKLACE, 30000000, 15, 1);
	DropItem(II_ARM_ARM_SHI_AVALON, 30000000, 0, 1);

	DropKind(IK3_SWD, 41, 48);
	DropKind(IK3_AXE, 41, 48);
	DropKind(IK3_CHEERSTICK, 41, 48);
	DropKind(IK3_KNUCKLEHAMMER, 41, 48);
	DropKind(IK3_WAND, 41, 48);
	DropKind(IK3_STAFF, 41, 48);
	DropKind(IK3_HELMET, 41, 48);
	DropKind(IK3_SUIT, 41, 48);
	DropKind(IK3_GAUNTLET, 41, 48);
	DropKind(IK3_BOOTS, 41, 48);
	DropKind(IK3_SHIELD, 41, 48);
	DropKind(IK3_BOW, 41, 48);
	DropKind(IK3_YOYO, 41, 48);

	DropItem(II_GEN_MAT_ELE_RIVER, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_RIVER, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropItem(II_GEN_GEM_GEM_TOMBMARBLE, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_TOMBMARBLE, 1000000000, 0, 1);

	DropItem(II_GEN_POT_DRI_VITAL500,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_FIFTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_INS_BREAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_INS_BREAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_INS_BREAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_FRUITJUICE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_FRUITJUICE, 600000001, 0, 1);

	

	m_nAttackFirstRange = 8;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                          
                        berserk 20 1.2            
                    }
		#move
		    {
			loot d 3
		    }	
   	}               
}
MI_BASQUE1
{
	Maxitem = 2;
	DropGold(43, 62);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);


	DropItem(II_GEN_GEM_GEM_GOLDENFIST, 300000000, 0, 1);


	

	m_nAttackFirstRange = 8;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 50 
                        keeprangeattack 6            
                    }
		#move
		    {
			loot d 4
		    }	
   	}               
}
MI_BASQUE2
{
	Maxitem = 2;
	DropGold(43, 62);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

		

	DropItem(II_GEN_GEM_GEM_GOLDENFIST, 200000000, 0, 1);


	

	m_nAttackFirstRange = 8;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Berserk 20 1.3 
                        keeprangeattack 7            
                    }
		#move
		    {
			
		    }	
   	}               
}
MI_BASQUE3
{
	Maxitem = 2;
	DropGold(44, 63);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_GEM_GEM_GOLDENFIST, 200000000, 0, 1);

	m_nAttackFirstRange = 8;



	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 50
                        
                        Rangeattack 6
			evade 30
            
                    }
		#move
		    {
			
		    }	
   	}               
}
MI_BASQUE4
{
	Maxitem = 5;
	DropGold(324, 470);

	DropItem(II_WEA_SWO_FLAM,   10000000, 0, 1);
	DropItem(II_WEA_CHEE_BAREM, 10000000, 0, 1);
	DropItem(II_WEA_WAN_FIRE, 10000000, 0, 1);
	DropItem(II_WEA_STA_FLAM, 10000000, 0, 1);
	DropItem(II_WEA_KNU_PAIPOL, 10000000, 0, 1);
	DropItem(II_WEA_AXE_DRAKHAN, 10000000, 0, 1);

	DropKind(IK3_SWD, 43, 50);
	DropKind(IK3_AXE, 43, 50);
	DropKind(IK3_CHEERSTICK, 43, 50);
	DropKind(IK3_KNUCKLEHAMMER, 43, 50);
	DropKind(IK3_WAND, 43, 50);
	DropKind(IK3_STAFF, 43, 50);
	DropKind(IK3_HELMET, 43, 50);
	DropKind(IK3_SUIT, 43, 50);
	DropKind(IK3_GAUNTLET, 43, 50);
	DropKind(IK3_BOOTS, 43, 50);
	DropKind(IK3_SHIELD, 43, 50);
	DropKind(IK3_BOW, 43, 50);
	DropKind(IK3_YOYO, 43, 50);

	DropItem(II_GEN_MAT_ELE_CYCLON, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_CYCLON, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropItem(II_GEN_GEM_GEM_GOLDENFIST, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_GOLDENFIST, 1000000000, 0, 1);

	DropItem(II_GEN_POT_DRI_VITAL500,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_FIFTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_COO_SAUSAGECASSEROLE, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_SAUSAGECASSEROLE, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_SAUSAGECASSEROLE, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_FRUITJUICE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_FRUITJUICE, 600000001, 0, 1);

	

	m_nAttackFirstRange = 8;



	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                        
                        rangeattack 10            
                    }
		#move
		    {
			loot d 3
		    }	
   	}               
}

MI_PRANKSTER1
{
	Maxitem = 2;
	DropGold(44, 64);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);



	DropItem(II_GEN_GEM_GEM_ORBRIN, 300000000, 0, 1);

	

	m_nAttackFirstRange = 8;



	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning sam 
                                   
                    }
		#move
		    {
			
		    }	
   	}               
}
MI_PRANKSTER2
{
	Maxitem = 2;
	DropGold(44, 64);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	

	DropItem(II_GEN_GEM_GEM_ORBRIN, 200000000, 0, 1);

	

	m_nAttackFirstRange = 8;
	


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low 
                        Berserk 20 1.3            
                    }
		#move
		    {
			loot d 2
		    }	
   	}               
}
MI_PRANKSTER3
{
	Maxitem = 2;
	DropGold(45, 66);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);



	DropItem(II_GEN_GEM_GEM_ORBRIN, 200000000, 0, 1);

	

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low
                        
                                    
                    }
		#move
		    {
			
		    }	
   	}               
}
MI_PRANKSTER4
{
	Maxitem = 5;
	DropGold(330, 479);

	DropItem(II_WEA_SWO_FLAM,   10000000, 0, 1);
	DropItem(II_WEA_CHEE_BAREM, 10000000, 0, 1);
	DropItem(II_WEA_WAN_FIRE, 10000000, 0, 1);
	DropItem(II_WEA_STA_FLAM, 10000000, 0, 1);
	DropItem(II_WEA_KNU_PAIPOL, 10000000, 0, 1);
	DropItem(II_WEA_AXE_DRAKHAN, 10000000, 0, 1);
	
	DropItem(II_GEN_MAT_ELE_GENERATOR, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_GENERATOR, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropKind(IK3_SWD, 45, 52);
	DropKind(IK3_AXE, 45, 52);
	DropKind(IK3_CHEERSTICK, 45, 52);
	DropKind(IK3_KNUCKLEHAMMER, 45, 52);
	DropKind(IK3_WAND, 45, 52);
	DropKind(IK3_STAFF, 45, 52);
	DropKind(IK3_HELMET, 45, 52);
	DropKind(IK3_SUIT, 45, 52);
	DropKind(IK3_GAUNTLET, 45, 52);
	DropKind(IK3_BOOTS, 45, 52);
	DropKind(IK3_SHIELD, 45, 52);
	DropKind(IK3_BOW, 45, 52);
	DropKind(IK3_YOYO, 45, 52);

	DropItem(II_GEN_GEM_GEM_ORBRIN, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_ORBRIN, 1000000000, 0, 1);

	DropItem(II_GEN_POT_DRI_VITAL500, 110000000, 0, 1);
	DropItem(II_GEN_REF_REF_SIXTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_COO_SAUSAGECASSEROLE, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_SAUSAGECASSEROLE, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_SAUSAGECASSEROLE, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_FRUITJUICE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_FRUITJUICE, 600000001, 0, 1);

	

	m_nAttackFirstRange = 8;



	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                          
                                    
                    }
		#move
		    {
			loot d 3
		    }	
   	}               
}

MI_WHEELEM1
{
	Maxitem = 2;
	DropGold(46, 67);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);


	DropItem(II_GEN_GEM_GEM_GOLDENCUP, 300000000, 0, 1);

	

	m_nAttackFirstRange = 8;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                        evade 10            
                    }
		#move
		    {
			
		    }	
   	}               
}
MI_WHEELEM2
{
	Maxitem = 2;
	DropGold(46, 67);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);


	DropItem(II_GEN_GEM_GEM_GOLDENCUP, 200000000, 0, 1);

	

	m_nAttackFirstRange = 8;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 50 
                        berserk 30 1.2            
                    }
		#move
		    {
			loot d 4
		    }	
   	}               
}
MI_WHEELEM3
{
	Maxitem = 2;
	DropGold(46, 67);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);



	DropItem(II_GEN_GEM_GEM_GOLDENCUP, 200000000, 0, 1);

	

	m_nAttackFirstRange = 8;
	


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low
                                   
                    }
		#move
		    {
			
		    }	
   	}               
}
MI_WHEELEM4
{
	Maxitem = 5;
	DropGold(341, 495);

	DropItem(II_GEN_JEW_RIN_DEXRING, 30000000, 4, 1);
	DropItem(II_GEN_JEW_RIN_STARING, 30000000, 4, 1);

	DropItem(II_WEA_SWO_KARMEL, 83320, 0, 1);
	DropItem(II_WEA_CHEE_BOSL, 83320, 0, 1);
	DropItem(II_WEA_WAN_SAINT, 83320, 0, 1);
	DropItem(II_WEA_STA_VENHILL, 83320, 0, 1);
	DropItem(II_WEA_KNU_APPEL, 83320, 0, 1);
	DropItem(II_WEA_AXE_FRENETIC, 83320, 0, 1);

	DropKind(IK3_SWD, 47, 54);
	DropKind(IK3_AXE, 47, 54);
	DropKind(IK3_CHEERSTICK, 47, 54);
	DropKind(IK3_KNUCKLEHAMMER, 47, 54);
	DropKind(IK3_WAND, 47, 54);
	DropKind(IK3_STAFF, 47, 54);
	DropKind(IK3_HELMET, 47, 54);
	DropKind(IK3_SUIT, 47, 54);
	DropKind(IK3_GAUNTLET, 47, 54);
	DropKind(IK3_BOOTS, 47, 54);
	DropKind(IK3_SHIELD, 47, 54);
	DropKind(IK3_BOW, 47, 54);
	DropKind(IK3_YOYO, 47, 54);

	DropItem(II_GEN_MAT_ELE_GENERATOR, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_GENERATOR, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropItem(II_GEN_GEM_GEM_GOLDENCUP, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_GOLDENCUP, 1000000000, 0, 1);

	DropItem(II_GEN_POT_DRI_VITAL500,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_SIXTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_COO_SAUSAGECASSEROLE, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_SAUSAGECASSEROLE, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_SAUSAGECASSEROLE, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_FRUITICEWATER, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_FRUITICEWATER, 600000001, 0, 1);

	

	m_nAttackFirstRange = 8;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                          
                        Berserk 20 1.3            
                    }
		#move
		    {
			loot d 5
		    }	
   	}               
}


MI_LEYENA1
{
	Maxitem = 2;
	DropGold(47, 68);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);


	DropItem(II_GEN_GEM_GEM_TOMA, 300000000, 0, 1);


	

	m_nAttackFirstRange = 8;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack  
                        berserk 30 1.2
			Evade 10            
                    }
		#move
		    {
			
		    }	
   	}               
}
MI_LEYENA2
{
	Maxitem = 2;
	DropGold(47, 68);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	

	DropItem(II_GEN_GEM_GEM_TOMA, 200000000, 0, 1);


	

	m_nAttackFirstRange = 8;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Keeprangeattack 8 
                                    
                    }
		#move
		    {
			loot d 3
		    }	
   	}               
}
MI_LEYENA3
{
	Maxitem = 2;
	DropGold(48, 69);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	

	DropItem(II_GEN_GEM_GEM_TOMA, 200000000, 0, 1);


	

	m_nAttackFirstRange = 8;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                        
                                    
                    }
		#move
		    {
			
		    }	
   	}               
}
MI_LEYENA4
{
	Maxitem = 5;
	DropGold(352, 511);

	DropItem(II_GEN_JEW_RIN_STRRING, 30000000, 4, 1);
	DropItem(II_GEN_JEW_RIN_INTRING, 30000000, 4, 1);
	DropItem(II_GEN_JEW_RIN_DEXRING, 30000000, 4, 1);
	DropItem(II_GEN_JEW_RIN_STARING, 30000000, 4, 1);

	DropItem(II_GEN_MAT_ELE_FLAME, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_FLAME, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropKind(IK3_SWD, 49, 56);
	DropKind(IK3_AXE, 49, 56);
	DropKind(IK3_CHEERSTICK, 49, 56);
	DropKind(IK3_KNUCKLEHAMMER, 49, 56);
	DropKind(IK3_WAND, 49, 56);
	DropKind(IK3_STAFF, 49, 56);
	DropKind(IK3_HELMET, 49, 56);
	DropKind(IK3_SUIT, 49, 56);
	DropKind(IK3_GAUNTLET, 49, 56);
	DropKind(IK3_BOOTS, 49, 56);
	DropKind(IK3_SHIELD, 49, 56);
	DropKind(IK3_BOW, 49, 56);
	DropKind(IK3_YOYO, 49, 56);

	DropItem(II_GEN_GEM_GEM_TOMA, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_TOMA, 1000000000, 0, 1);

	DropItem(II_GEN_POT_DRI_VITAL500,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_SIXTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_INS_HOTDOG, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_INS_HOTDOG, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_INS_HOTDOG, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_FRUITICEWATER, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_FRUITICEWATER, 600000001, 0, 1);

	

	m_nAttackFirstRange = 8;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                        Berserk 30 1.5
			summon 10 1 MI_LEYENA3
			recovery 10 40 100 m  
                          
                                    
                    }
		#move
		    { 
			loot d 3
		    }	
   	}               

}

MI_STEAMWALKER1
{
	Maxitem = 2;
	DropGold(48, 70);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	

	DropItem(II_GEN_GEM_GEM_STEAMTEAR, 300000000, 0, 1);

	

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning sam 
                        evade 30            
                    }
		#move
		    {
			loot d 4
		    }	
   	}               

}
MI_STEAMWALKER2
{
	Maxitem = 2;
	DropGold(48, 70);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);



	DropItem(II_GEN_GEM_GEM_STEAMTEAR, 200000000, 0, 1);

	
	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 50 
                        Berserk 30 1.2            
                    }
		#move
		    {
			
		    }	
   	}               

}
MI_STEAMWALKER3
{
	Maxitem = 2;
	DropGold(49, 71);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);


	DropItem(II_GEN_GEM_GEM_STEAMTEAR, 200000000, 0, 1);

	

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                                    
                    }
		#move
		    {
			loot d 3
		    }	
   	}               

}
MI_STEAMWALKER4
{
	Maxitem = 5;
	DropGold(364, 527);

	DropKind(IK3_SWD, 51, 58);
	DropKind(IK3_AXE, 51, 58);
	DropKind(IK3_CHEERSTICK, 51, 58);
	DropKind(IK3_KNUCKLEHAMMER, 51, 58);
	DropKind(IK3_WAND, 51, 58);
	DropKind(IK3_STAFF, 51, 58);
	DropKind(IK3_HELMET, 51, 58);
	DropKind(IK3_SUIT, 51, 58);
	DropKind(IK3_GAUNTLET, 51, 58);
	DropKind(IK3_BOOTS, 51, 58);
	DropKind(IK3_SHIELD, 51, 58);
	DropKind(IK3_BOW, 51, 58);
	DropKind(IK3_YOYO, 51, 58);

	DropItem(II_GEN_MAT_ELE_GENERATOR, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_GENERATOR, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropItem(II_GEN_GEM_GEM_STEAMTEAR, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_STEAMTEAR, 1000000000, 0, 1);

	DropItem(II_GEN_POT_DRI_VITAL600,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_SIXTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_INS_HOTDOG, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_INS_HOTDOG, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_INS_HOTDOG, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_FRUITICEWATER, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_FRUITICEWATER, 600000001, 0, 1);

	

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                        Berserk 30 1.5
			summon 10 1 MI_STEAMWALKER3
			recovery 10 40 100 m 
                          
                                    
                    }
		#move
		    {
			loot d 5
		    }	
   	}               

}


MI_STEELKNIGHT1
{
	Maxitem = 2;
	DropGold(50, 73);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);



	DropItem(II_GEN_GEM_GEM_KNIGHTLER, 300000000, 0, 1);


	

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack  
                                    
                    }
		#move
		    {
			loot d 5
		    }	
   	}               

}
MI_STEELKNIGHT2
{
	Maxitem = 2;
	DropGold(50, 73);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	

	DropItem(II_GEN_GEM_GEM_KNIGHTLER, 200000000, 0, 1);


	

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 60 
                        Keeprangeattack 10            
                    }
		#move
		    {
			
		    }	
   	}               

}
MI_STEELKNIGHT3
{
	Maxitem = 2;
	DropGold(51, 74);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	

	DropItem(II_GEN_GEM_GEM_KNIGHTLER, 200000000, 0, 1);


	

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low
                                    
                    }
		#move
		    {
			
		    }	
   	}               

}
MI_STEELKNIGHT4
{
	Maxitem = 4;
	DropGold(375, 544);

	DropItem(II_GEN_JEW_NEC_HPNECKLACE, 30000000, 6, 1);
	DropItem(II_GEN_JEW_NEC_FPNECKLACE, 30000000, 19, 1);
	DropItem(II_GEN_JEW_NEC_MPNECKLACE, 4166000, 20, 1);

	DropKind(IK3_SWD, 53, 60);
	DropKind(IK3_AXE, 53, 60);
	DropKind(IK3_CHEERSTICK, 53, 60);
	DropKind(IK3_KNUCKLEHAMMER, 53, 60);
	DropKind(IK3_WAND, 53, 60);
	DropKind(IK3_STAFF, 53, 60);
	DropKind(IK3_HELMET, 53, 60);
	DropKind(IK3_SUIT, 53, 60);
	DropKind(IK3_GAUNTLET, 53, 60);
	DropKind(IK3_BOOTS, 53, 60);
	DropKind(IK3_SHIELD, 53, 60);
	DropKind(IK3_BOW, 53, 60);
	DropKind(IK3_YOYO, 53, 60);

	DropItem(II_GEN_MAT_ELE_CYCLON, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_CYCLON, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropItem(II_GEN_GEM_GEM_KNIGHTLER, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_KNIGHTLER, 1000000000, 0, 1);

	DropItem(II_GEN_POT_DRI_VITAL600,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_SIXTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_INS_HOTDOG, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_INS_HOTDOG, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_INS_HOTDOG, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_FRUITICEWATER, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_FRUITICEWATER, 600000001, 0, 1);

	

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                        Berserk 30 1.5
			summon 10 1 MI_STEELKNIGHT3
			recovery 10 40 100 m 
                          
                                    
                    }
		#move
		    {
			loot d 3
		    }	
   	}               

}

MI_NUTTYWHEEL1
{
	Maxitem = 2;
	DropGold(52, 75);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	


	DropItem(II_GEN_GEM_GEM_WHEESHOE, 300000000, 0, 1);


	

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 80 
                                    
                    }
		#move
		    {
			loot d 5
		    }	
   	}               

}
MI_NUTTYWHEEL2
{
	Maxitem = 2;
	DropGold(52, 75);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);


	DropItem(II_GEN_GEM_GEM_WHEESHOE, 200000000, 0, 1);


	

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Keeprangeattack 6 
                                    
                    }
		#move
		    {
			
		    }	
   	}               

}
MI_NUTTYWHEEL3
{
	Maxitem = 2;
	DropGold(52, 76);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	

	DropItem(II_GEN_GEM_GEM_WHEESHOE, 200000000, 0, 1);


	

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low
                        
                                    
                    }
		#move
		    {
			
		    }	
   	}               

}
MI_NUTTYWHEEL4
{
	Maxitem = 5;
	DropGold(386, 560);

	DropItem(II_WEA_SWO_SPARKLING,   10000000, 0, 1);
	DropItem(II_WEA_CHEE_HYPER, 	 10000000, 0, 1);
	DropItem(II_WEA_WAN_RUNE, 	 10000000, 0, 1);
	DropItem(II_WEA_STA_SEGE, 	 10000000, 0, 1);
	DropItem(II_WEA_KNU_ZIKMOON, 	 10000000, 0, 1);
	DropItem(II_WEA_AXE_CRITIN, 	 10000000, 0, 1);
	DropItem(II_ARM_ARM_SHI_ANCIENT, 30000000, 0, 1);

	DropKind(IK3_SWD, 55, 62);
	DropKind(IK3_AXE, 55, 62);
	DropKind(IK3_CHEERSTICK, 55, 62);
	DropKind(IK3_KNUCKLEHAMMER, 55, 62);
	DropKind(IK3_WAND, 55, 62);
	DropKind(IK3_STAFF, 55, 62);
	DropKind(IK3_HELMET, 55, 62);
	DropKind(IK3_SUIT, 55, 62);
	DropKind(IK3_GAUNTLET, 55, 62);
	DropKind(IK3_BOOTS, 55, 62);
	DropKind(IK3_SHIELD, 55, 62);
	DropKind(IK3_BOW, 55, 62);
	DropKind(IK3_YOYO, 55, 62);

	DropItem(II_GEN_MAT_ELE_DESERT, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_DESERT, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropItem(II_GEN_GEM_GEM_WHEESHOE, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_WHEESHOE, 1000000000, 0, 1);

	DropItem(II_GEN_POT_DRI_VITAL600,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_SEVENTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_COO_FISHSTEW, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_FISHSTEW, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_FISHSTEW, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_FRUITICEWATER, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_FRUITICEWATER, 600000001, 0, 1);

	
	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                        Berserk 30 1.5
			summon 10 1 MI_NUTTYWHEEL3
			recovery 10 40 100 m            
                    }
		#move
		    {
			loot d 3
		    }	
   	}               

}

MI_DRILLER1    // ���⼭���� 59������.
{
	Maxitem = 2;
	DropGold(53, 77);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);


	DropItem(II_GEN_GEM_GEM_DROIL, 300000000, 0, 1);


	

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning sam 
                                    
                    }
		#move
		    {
			
		    }	
   	}               

}
MI_DRILLER2
{
	Maxitem = 2;
	DropGold(53, 77);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);


	DropItem(II_GEN_GEM_GEM_DROIL, 200000000, 0, 1);


	

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			keeprangeattack 7  
                                    
                    }
		#move
		    {
			loot d 3
		    }	
   	}               

}
MI_DRILLER3
{
	Maxitem = 2;
	DropGold(54, 78);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);


	DropItem(II_GEN_GEM_GEM_DROIL, 200000000, 0, 1);


	

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                        
                                    
                    }
		#move
		    {
			loot d 3
		    }	
   	}               

}
MI_DRILLER4
{
	Maxitem = 5;
	DropGold(397, 576);

	DropKind(IK3_SWD, 57, 64);
	DropKind(IK3_AXE, 57, 64);
	DropKind(IK3_CHEERSTICK, 57, 64);
	DropKind(IK3_KNUCKLEHAMMER, 57, 64);
	DropKind(IK3_WAND, 57, 64);
	DropKind(IK3_STAFF, 57, 64);
	DropKind(IK3_HELMET, 57, 64);
	DropKind(IK3_SUIT, 57, 64);
	DropKind(IK3_GAUNTLET, 57, 64);
	DropKind(IK3_BOOTS, 57, 64);
	DropKind(IK3_SHIELD, 57, 64);
	DropKind(IK3_BOW, 57, 64);
	DropKind(IK3_YOYO, 57, 64);

	DropItem(II_GEN_MAT_ELE_GENERATOR, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_GENERATOR, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropItem(II_GEN_GEM_GEM_DROIL, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_DROIL, 1000000000, 0, 1);

	DropItem(II_GEN_POT_DRI_VITAL600,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_SEVENTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_COO_FISHSTEW, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_FISHSTEW, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_FISHSTEW, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_FRUITPARFAIT, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_FRUITPARFAIT, 600000001, 0, 1);



	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                        Berserk 30 1.5
			summon 10 1 MI_DRILLER3
			recovery 10 50 100 m 
                        
                                    
                    }
		#move
		    {
			loot d 4
		    }	
   	}               

}

MI_VOLT1
{
	Maxitem = 2;
	DropGold(55, 80);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);


	DropItem(II_GEN_GEM_GEM_AMPERE, 300000000, 0, 1);


	

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack  
                        
			evade 20            
                    }
		#move
		    {
			
		    }	
   	}               

}
MI_VOLT2
{
	Maxitem = 2;
	DropGold(55, 80);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);



	DropItem(II_GEN_GEM_GEM_AMPERE, 200000000, 0, 1);
	

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 70 cunning low
			berserk 20 1.2 
                                    
                    }
		#move
		    {
			loot d 3
		    }	
   	}               

}
MI_VOLT3
{
	Maxitem = 2;
	DropGold(56, 81);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);


	DropItem(II_GEN_GEM_GEM_AMPERE, 200000000, 0, 1);


	

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                                    
                    }
		#move
		    {
			loot d 3
		    }	
   	}               

}
MI_VOLT4
{
	Maxitem = 5;
	DropGold(408, 592);

	DropItem(II_GEN_JEW_RIN_STRRING, 30000000, 5, 1);
	DropItem(II_GEN_JEW_RIN_INTRING, 30000000, 5, 1);
	DropItem(II_GEN_JEW_RIN_DEXRING, 30000000, 5, 1);
	DropItem(II_GEN_JEW_RIN_STARING, 30000000, 5, 1);

	DropKind(IK3_SWD, 59, 66);
	DropKind(IK3_AXE, 59, 66);
	DropKind(IK3_CHEERSTICK, 59, 66);
	DropKind(IK3_KNUCKLEHAMMER, 59, 66);
	DropKind(IK3_WAND, 59, 66);
	DropKind(IK3_STAFF, 59, 66);
	DropKind(IK3_HELMET, 59, 66);
	DropKind(IK3_SUIT, 59, 66);
	DropKind(IK3_GAUNTLET, 59, 66);
	DropKind(IK3_BOOTS, 59, 66);
	DropKind(IK3_SHIELD, 59, 66);
	DropKind(IK3_BOW, 59, 66);
	DropKind(IK3_YOYO, 59, 66);

	DropItem(II_GEN_MAT_ELE_FLAME, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_FLAME, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropItem(II_GEN_GEM_GEM_AMPERE, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_AMPERE, 1000000000, 0, 1);

	DropItem(II_GEN_POT_DRI_VITAL700,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_SEVENTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_COO_FISHSTEW, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_FISHSTEW, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_FISHSTEW, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_FRUITPARFAIT, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_FRUITPARFAIT, 600000001, 0, 1);



	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                        Berserk 30 1.5
			summon 10 1 MI_VOLT3
			recovery 10 50 100 m  
                                    
                    }
		#move
		    {
			
		    }	
   	}               

}


MI_ELDERGUARD1
{
	Maxitem = 2;
	DropGold(56, 82);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);



	DropItem(II_GEN_GEM_GEM_GUARDIEYE, 300000000, 0, 1);


	

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack  
                                    
                    }
		#move
		    {
			loot d 4
		    }	
   	}               

}
MI_ELDERGUARD2
{
	Maxitem = 2;
	DropGold(56, 82);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	
	DropItem(II_GEN_GEM_GEM_GUARDIEYE, 200000000, 0, 1);


	

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			attack
			 
                                    
                    }
		#move
		    {
			
		    }	
   	}               

}
MI_ELDERGUARD3
{
	Maxitem = 2;
	DropGold(57, 83);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);


	DropItem(II_GEN_GEM_GEM_GUARDIEYE, 200000000, 0, 1);




	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                        
                        berserk 20 1.25            
                    }
		#move
		    {
			
		    }	
   	}               

}
MI_ELDERGUARD4
{
	Maxitem = 5;
	DropGold(420, 609);
	DropKind(IK3_SWD, 61, 68);
	DropKind(IK3_AXE, 61, 68);
	DropKind(IK3_CHEERSTICK, 61, 68);
	DropKind(IK3_KNUCKLEHAMMER, 61, 68);
	DropKind(IK3_WAND, 61, 68);
	DropKind(IK3_STAFF, 61, 68);
	DropKind(IK3_HELMET, 61, 68);
	DropKind(IK3_SUIT, 61, 68);
	DropKind(IK3_GAUNTLET, 61, 68);
	DropKind(IK3_BOOTS, 61, 68);
	DropKind(IK3_SHIELD, 61, 68);
	DropKind(IK3_BOW, 61, 68);
	DropKind(IK3_YOYO, 61, 68);

	DropItem(II_GEN_MAT_ELE_RIVER, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_RIVER, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropItem(II_GEN_GEM_GEM_GUARDIEYE, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_GUARDIEYE, 1000000000, 0, 1);

	DropItem(II_GEN_POT_DRI_VITAL700,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_SEVENTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_INS_HODDUK, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_INS_HODDUK, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_INS_HODDUK, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_FRUITPARFAIT, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_FRUITPARFAIT, 600000001, 0, 1);


	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                        Berserk 30 1.5
			summon 10 1 MI_ELDERGUARD3
			recovery 10 50 100 m 
                          
                                    
                    }
		#move
		    {
			loot d 3
		    }	
   	}               

}

MI_GARBAGEPIDER1
{
	Maxitem = 2;
	DropGold(58, 84);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	

	DropItem(II_GEN_GEM_GEM_GARBAGETON, 300000000, 0, 1);


	

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 50 cunning sam
			berserk 20 1.15 
                                    
                    }
		#move
		    {
			loot d 3
		    }	
   	}               

}
MI_GARBAGEPIDER2
{
	Maxitem = 2;
	DropGold(58, 84);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	

	DropItem(II_GEN_GEM_GEM_GARBAGETON, 200000000, 0, 1);


	

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			attack 
                        evade 20            
                    }
		#move
		    {
			loot d 4
		    }	
   	}               

}
MI_GARBAGEPIDER3
{
	Maxitem = 2;
	DropGold(59, 85);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);


	DropItem(II_GEN_GEM_GEM_GARBAGETON, 200000000, 0, 1);


	

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 50
                                    
                    }
		#move
		    {
			
		    }	
   	}               

}
MI_GARBAGEPIDER4
{
	Maxitem = 5;
	DropGold(436, 633);

	DropKind(IK3_SWD, 63, 70);
	DropKind(IK3_AXE, 63, 70);
	DropKind(IK3_CHEERSTICK, 63, 70);
	DropKind(IK3_KNUCKLEHAMMER, 63, 70);
	DropKind(IK3_WAND, 63, 70);
	DropKind(IK3_STAFF, 63, 70);
	DropKind(IK3_HELMET, 63, 70);
	DropKind(IK3_SUIT, 63, 70);
	DropKind(IK3_GAUNTLET, 63, 70);
	DropKind(IK3_BOOTS, 63, 70);
	DropKind(IK3_SHIELD, 63, 70);
	DropKind(IK3_BOW, 63, 70);
	DropKind(IK3_YOYO, 63, 70);

	DropItem(II_GEN_MAT_ELE_CYCLON, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_CYCLON, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropItem(II_GEN_GEM_GEM_GARBAGETON, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_GARBAGETON, 1000000000, 0, 1);

	DropItem(II_GEN_POT_DRI_VITAL700,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_SEVENTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_INS_HODDUK, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_INS_HODDUK, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_INS_HODDUK, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_FRUITPARFAIT, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_FRUITPARFAIT, 600000001, 0, 1);

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                        Berserk 30 1.5
			summon 10 1 MI_GARBAGEPIDER3
			recovery 10 50 100 m          
                    }
		#move
		    {
			
		    }	
   	}               

}

MI_CRANEMACHINERY1
{
	Maxitem = 2;
	DropGold(60, 87);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);


	DropItem(II_GEN_GEM_GEM_ERONIOR, 300000000, 0, 1);


	
	
	m_nAttackFirstRange = 10;



	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning sam 
                                    
                    }
		#move
		    {
			loot d 10
		    }	
   	}               

}
MI_CRANEMACHINERY2
{
	Maxitem = 2;
	DropGold(60, 87);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);



	DropItem(II_GEN_GEM_GEM_ERONIOR, 200000000, 0, 1);


	

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			attack cunning low  
                        evade 20            
                    }
		#move
		    {
			
		    }	
   	}               

}
MI_CRANEMACHINERY3
{
	Maxitem = 2;
	DropGold(61, 89);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);


	DropItem(II_GEN_GEM_GEM_ERONIOR, 200000000, 0, 1);


	

	m_nAttackFirstRange = 10;



	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low
                        berserk 30 1.25            
                    }
		#move
		    {
			
		    }	
   	}               

}
MI_CRANEMACHINERY4
{
	Maxitem = 5;
	DropGold(448, 649);

	DropKind(IK3_SWD, 65, 72);
	DropKind(IK3_AXE, 65, 72);
	DropKind(IK3_CHEERSTICK, 65, 72);
	DropKind(IK3_KNUCKLEHAMMER, 65, 72);
	DropKind(IK3_WAND, 65, 72);
	DropKind(IK3_STAFF, 65, 72);
	DropKind(IK3_HELMET, 65, 72);
	DropKind(IK3_SUIT, 65, 74);
	DropKind(IK3_GAUNTLET, 65, 72);
	DropKind(IK3_BOOTS, 65, 72);
	DropKind(IK3_SHIELD, 65, 72);
	DropKind(IK3_BOW, 65, 72);
	DropKind(IK3_YOYO, 65, 72);

	DropItem(II_GEN_MAT_ELE_GENERATOR, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_GENERATOR, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropItem(II_GEN_GEM_GEM_ERONIOR, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_ERONIOR, 1000000000, 0, 1);

	DropItem(II_GEN_POT_DRI_VITAL700,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_SEVENTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_COO_STEAMEDSEAFOOD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_STEAMEDSEAFOOD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_STEAMEDSEAFOOD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_FRUITSHERBET, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_FRUITSHERBET, 600000001, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                        Berserk 30 1.5
			summon 10 1 MI_CRANEMACHINERY3
			recovery 10 50 100 m 
                          
                                    
                    }
		#move
		    {
			loot d 3
		    }	
   	}               

}

MI_MOTHBEE1
{
	Maxitem = 2;
	DropGold(29, 42);
	DropItem(II_GEN_JEW_EAR_ATTEARRING, 10000000, 0, 1);


	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack  
                                    
                    }
		#move
		    {
			loot d 5
		    }	
   	}               

}
MI_MOTHBEE2
{
	Maxitem = 2;
	DropGold(29, 42);
	DropItem(II_GEN_JEW_EAR_DEFEARRING, 10000000, 0, 1);	


	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning sam 
                        berserk 30 1.25            
                    }
		#move
		    {
			
		    }	
   	}               

}
MI_MOTHBEE3
{
	Maxitem = 2;
	DropGold(30, 44);
	DropItem(II_GEN_JEW_EAR_ATTEARRING, 10000000, 0, 1);
	DropItem(II_GEN_JEW_EAR_DEFEARRING, 10000000, 0, 1);	


	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                                    
                    }
		#move
		    {
			
		    }	
   	}               

}
MI_MOTHBEE4
{
	Maxitem = 2;
	DropGold(224, 324);

	DropItem(II_GEN_JEW_EAR_ATTEARRING, 30000000, 0, 1);
	DropItem(II_GEN_JEW_EAR_DEFEARRING, 30000000, 0, 1);	

	DropItem(II_GEN_MAT_ELE_FLAME, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_FLAME, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                          
                        berserk 30 1.2            
                    }
		#move
		    {
			loot d 3
		    }	
   	}               

}

MI_FLBYRIGEN1
{
	Maxitem = 2;
	DropGold(41, 60);
	DropItem(II_GEN_JEW_EAR_ATTEARRING, 10000000, 7, 1);


	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 70 
                                    
                    }
		#move
		    {
			
		    }	
   	}               

}
MI_FLBYRIGEN2
{
	Maxitem = 2;
	DropGold(41, 60);
	DropItem(II_GEN_JEW_EAR_DEFEARRING, 10000000, 7, 1);


	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack  
                        berserk 20 1.2            
                    }
		#move
		    {
			loot d 3
		    }	
   	}              

}
MI_FLBYRIGEN3
{
	Maxitem = 2;
	DropGold(42, 61);

	DropItem(II_GEN_JEW_EAR_ATTEARRING, 10000000, 2, 1);
	DropItem(II_GEN_JEW_EAR_DEFEARRING, 10000000, 7, 1);


	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low
                        
                        evade 5            
                    }
		#move
		    {
			
		    }	
   	}               

}
MI_FLBYRIGEN4
{
	Maxitem = 2;
	DropGold(308, 446);

	DropItem(II_GEN_JEW_EAR_ATTEARRING, 30000000, 2, 1);
	DropItem(II_GEN_JEW_EAR_DEFEARRING, 30000000, 7, 1);

	DropItem(II_GEN_MAT_ELE_DESERT, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_DESERT, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                          
                                    
                    }
		#move
		    {
			loot d 4
		    }	
   	}               

}

MI_ROCKEPELLER1
{
	Maxitem = 2;
	DropGold(46, 67);

	DropItem(II_GEN_JEW_EAR_ATTEARRING, 10000000, 3, 1);


	

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 60 
                        evade 20            
                    }
		#move
		    {
			loot d 3
		    }	
   	}               

}
MI_ROCKEPELLER2
{
	Maxitem = 2;
	DropGold(46, 67);

	DropItem(II_GEN_JEW_EAR_DEFEARRING, 10000000, 9, 1);



	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low 
                        berserk 30 1.35            
                    }
		#move
		    {
			
		    }	
   	}               

}
MI_ROCKEPELLER3
{
	Maxitem = 2;
	DropGold(46, 67);

	DropItem(II_GEN_JEW_EAR_ATTEARRING, 10000000, 3, 1);
	DropItem(II_GEN_JEW_EAR_DEFEARRING, 10000000, 9, 1);



	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning sam
                                                          
                    }
		#move
		    {
			
		    }	
   	}               

}
MI_ROCKEPELLER4
{
	Maxitem = 2;
	DropGold(341, 495);

	DropItem(II_GEN_JEW_EAR_ATTEARRING, 30000000, 3, 1);
	DropItem(II_GEN_JEW_EAR_DEFEARRING, 30000000, 9, 1);

	DropItem(II_GEN_MAT_ELE_FLAME, 75000000, 0, 1); //�Ӽ� ī��3 2.5%
	DropItem(II_GEN_MAT_ELE_FLAME, 150000000, 0, 1); //�Ӽ� ī��2 5%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                        Berserk 30 1.5
			summon 10 1 MI_ROCKEPELLER3
			recovery 10 40 100 m             
                    }
		#move
		    {
			loot d 3
		    }	
   	}               

}

MI_MINECATCHER
{
	Maxitem = 0;
}

MI_ERONSCATCHER
{
	Maxitem = 0;
}

MI_KRASECCATCHER
{
	Maxitem = 0;
}

MI_GURUCATCHER
{
	Maxitem = 0;
}

//���϶�ī
MI_SYLIACA1
{
	Maxitem = 2;
	DropGold(160, 232);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);



	DropItem(II_GEN_GEM_GEM_SYCALE, 300000000, 0, 1);


	

	m_nAttackFirstRange = 10;
	

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 70 
                        Berserk 20 1.3            
                    }
		#move
		    {
			
		    }	
   	}               

}

MI_SYLIACA2
{
	Maxitem = 2;
	DropGold(160, 232);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	

	DropItem(II_GEN_GEM_GEM_SYCALE, 200000000, 0, 1);


	

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Keeprangeattack 8
			
                                    
                    }
		#move
		    {
			loot d 4
		    }	
   	}               

}

MI_SYLIACA3
{
	Maxitem = 2;
	DropGold(160, 232);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);


	DropItem(II_GEN_GEM_GEM_SYCALE, 200000000, 0, 1);


	

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low
                        
                        evade 20            
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_SYLIACA4
{
	Maxitem = 4;
	DropGold(592, 860);

	DropItem(II_WEA_SWO_SUHO, 3600000, 0, 1);
	DropItem(II_WEA_SWT_SUHO, 3600000, 0, 1);
	DropItem(II_WEA_AXE_SUHO, 3600000, 0, 1);
	DropItem(II_WEA_AXT_SUHO, 3600000, 0, 1);
	DropItem(II_WEA_KNU_SUHO, 3600000, 0, 1);
	DropItem(II_WEA_CHE_SUHO, 3600000, 0, 1);
	DropItem(II_WEA_WAN_SUHO, 3600000, 0, 1);
	DropItem(II_WEA_STA_SUHO, 3600000, 0, 1);
	DropItem(II_WEA_BOW_SUHO, 3600000, 0, 1);
	DropItem(II_WEA_YOY_SUHO, 3600000, 0, 1);

	DropItem(II_GEN_JEW_NEC_HPNECKLACE, 4166000, 5, 1);
	DropItem(II_GEN_JEW_RIN_DEXRING, 4166000, 3, 1);
	DropItem(II_GEN_JEW_RIN_STARING, 4166000, 3, 1);

	DropKind(IK3_SWD, 67, 74);
	DropKind(IK3_AXE, 67, 74);
	DropKind(IK3_CHEERSTICK, 67, 74);
	DropKind(IK3_KNUCKLEHAMMER, 67, 74);
	DropKind(IK3_WAND, 67, 74);
	DropKind(IK3_STAFF, 67, 74);
	DropKind(IK3_HELMET, 67, 74);
	DropKind(IK3_SUIT, 67, 74);
	DropKind(IK3_GAUNTLET, 67, 74);
	DropKind(IK3_BOOTS, 67, 7);
	DropKind(IK3_SHIELD, 67, 74);
	DropKind(IK3_BOW, 67, 74);
	DropKind(IK3_YOYO, 67, 74);

	DropItem(II_GEN_MAT_ELE_GENERATOR, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_GENERATOR, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropItem(II_GEN_GEM_GEM_SYCALE, 100000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_SYCALE, 100000000, 0, 1);

	DropItem(II_GEN_POT_DRI_VITAL700,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_SEVENTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_COO_STEAMEDSEAFOOD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_STEAMEDSEAFOOD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_STEAMEDSEAFOOD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_FRUITSHERBET, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_FRUITSHERBET, 600000001, 0, 1);



	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                        Berserk 30 1.5
			summon 10 1 MI_SYLIACA3
			recovery 10 40 100 m            
                    }
		#move
		    {
			loot d 5
		    }	
   	}               

}

//�׸���
MI_GREEMONG1
{
	Maxitem = 2;
	DropGold(184, 268);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);


	DropItem(II_GEN_GEM_GEM_MONGTEAR, 300000000, 0, 1);


	

	m_nAttackFirstRange = 10;



	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 30 
                        Rangeattack 6            
                    }
		#move
		    {
			
		    }	
   	}               

}

MI_GREEMONG2
{
	Maxitem = 2;
	DropGold(184, 268);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);


	DropItem(II_GEN_GEM_GEM_MONGTEAR, 200000000, 0, 1);


	

	m_nAttackFirstRange = 10;



	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning hi 
                                   
                    }
		#move
		    {
			
		    }	
   	}               

}

MI_GREEMONG3
{
	Maxitem = 2;
	DropGold(184, 268);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	

	DropItem(II_GEN_GEM_GEM_MONGTEAR, 200000000, 0, 1);


	

	m_nAttackFirstRange = 10;



	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning sam
                       
                        Berserk 20 1.3           
                    }
		#move
		    {
			loot d 4
		    }	
   	}               

}

MI_GREEMONG4
{
	Maxitem = 5;
	DropGold(682, 990);

	DropItem(II_WEA_SWO_SUHO, 4050000, 0, 1);
	DropItem(II_WEA_SWT_SUHO, 4050000, 0, 1);
	DropItem(II_WEA_AXE_SUHO, 4050000, 0, 1);
	DropItem(II_WEA_AXT_SUHO, 4050000, 0, 1);
	DropItem(II_WEA_KNU_SUHO, 4050000, 0, 1);
	DropItem(II_WEA_CHE_SUHO, 4050000, 0, 1);
	DropItem(II_WEA_WAN_SUHO, 4050000, 0, 1);
	DropItem(II_WEA_STA_SUHO, 4050000, 0, 1);
	DropItem(II_WEA_BOW_SUHO, 4050000, 0, 1);
	DropItem(II_WEA_YOY_SUHO, 4050000, 0, 1);

	DropItem(II_GEN_JEW_RIN_STRRING, 30000000, 6, 1);
	DropItem(II_GEN_JEW_RIN_INTRING, 30000000, 6, 1);
	DropItem(II_GEN_JEW_RIN_DEXRING, 30000000, 6, 1);
	DropItem(II_GEN_JEW_RIN_STARING, 30000000, 6, 1);

	DropKind(IK3_SWD, 69, 75);
	DropKind(IK3_AXE, 69, 75);
	DropKind(IK3_CHEERSTICK, 69, 75);
	DropKind(IK3_KNUCKLEHAMMER, 69, 75);
	DropKind(IK3_WAND, 69, 75);
	DropKind(IK3_STAFF, 69, 75);
	DropKind(IK3_HELMET, 69, 75);
	DropKind(IK3_SUIT, 69, 75);
	DropKind(IK3_GAUNTLET, 69, 75);
	DropKind(IK3_BOOTS, 69, 75);
	DropKind(IK3_SHIELD, 69, 75);
	DropKind(IK3_BOW, 69, 75);
	DropKind(IK3_YOYO, 69, 75);

	DropItem(II_GEN_MAT_ELE_DESERT, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_DESERT, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropItem(II_GEN_GEM_GEM_MONGTEAR, 100000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_MONGTEAR, 100000000, 0, 1);

	DropItem(II_GEN_POT_DRI_VITAL800,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_EIGHTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                        Berserk 30 1.5
			summon 10 1 MI_GREEMONG3
			recovery 10 40 100 m             
                    }
		#move
		    {
			
		    }	
   	}               
}

//ĳ���ƺ�
MI_CARRIERBOMB1
{
	Maxitem = 2;
	DropGold(176, 256);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);


	DropItem(II_GEN_GEM_GEM_BOMBTIMER, 300000000, 0, 1);

	
	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 60 
                        berserk 20 1.2            
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_CARRIERBOMB2
{
	Maxitem = 2;
	DropGold(176, 256);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);


	DropItem(II_GEN_GEM_GEM_BOMBTIMER, 200000000, 0, 1);

	
	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack  
                        keeprangeattack 5            
					
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_CARRIERBOMB3
{
	Maxitem = 2;
	DropGold(180, 264);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	

	DropItem(II_GEN_GEM_GEM_BOMBTIMER, 200000000, 0, 1);

	

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low
			recovery 10 20 100 u
                        Rangeattack 6            
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_CARRIERBOMB4
{
	Maxitem = 5;
	DropGold(660, 958);


	DropItem(II_WEA_SWO_USU, 2700000, 0, 1);
	DropItem(II_WEA_SWT_USU, 2700000, 0, 1);
	DropItem(II_WEA_AXE_USU, 2700000, 0, 1);
	DropItem(II_WEA_AXT_USU, 2700000, 0, 1);
	DropItem(II_WEA_KNU_USU, 2700000, 0, 1);
	DropItem(II_WEA_CHE_USU, 2700000, 0, 1);
	DropItem(II_WEA_WAN_USU, 2700000, 0, 1);
	DropItem(II_WEA_STA_USU, 2700000, 0, 1);
	DropItem(II_WEA_BOW_USU, 2700000, 0, 1);
	DropItem(II_WEA_YOY_USU, 2700000, 0, 1);

	DropItem(II_GEN_JEW_RIN_STRRING, 4166000, 4, 1);
	DropItem(II_GEN_JEW_RIN_INTRING, 4166000, 4, 1);

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropKind(IK3_SWD, 73, 79);
	DropKind(IK3_AXE, 73, 79);
	DropKind(IK3_CHEERSTICK, 73, 79);
	DropKind(IK3_KNUCKLEHAMMER, 73, 79);
	DropKind(IK3_WAND, 73, 79);
	DropKind(IK3_STAFF, 73, 79);
	DropKind(IK3_HELMET, 73, 79);
	DropKind(IK3_SUIT, 73, 79);
	DropKind(IK3_GAUNTLET, 73, 79);
	DropKind(IK3_BOOTS, 73, 79);
	DropKind(IK3_SHIELD, 73, 79);
	DropKind(IK3_BOW, 73, 79);
	DropKind(IK3_YOYO, 73, 79);

	DropItem(II_GEN_MAT_ELE_FLAME, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_FLAME, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_GEM_GEM_BOMBTIMER, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_BOMBTIMER, 1000000000, 0, 1);

	DropItem(II_GEN_POT_DRI_VITAL800,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_EIGHTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                        Berserk 30 1.5
			summon 10 1 MI_CARRIERBOMB3
			recovery 10 40 100 m            
                    }
		#move
		    {
			loot d 3
		    }	
   	}               

}

//������
MI_RISEM1
{

	Maxitem = 2;
	DropGold(162, 234);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);



	DropItem(II_GEN_GEM_GEM_ZEMMARK, 300000000, 0, 1);

	SetCallHelper( 100, MI_RISEM3, 1, TRUE);
	SetCallHelper( 100, MI_RISEM2, 2, TRUE);

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 60
			berserk 20 1.3 
                                    
                    }
		#move
		    {
			loot d 5
		    }	
   	}               
}

MI_RISEM2
{
	Maxitem = 2;
	DropGold(162, 234);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	

	DropItem(II_GEN_GEM_GEM_ZEMMARK, 200000000, 0, 1);

	SetCallHelper( 100, MI_RISEM3, 1, TRUE);
	SetCallHelper( 100, MI_RISEM1, 2, TRUE);

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Keeprangeattack 8 
                                    
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_RISEM3
{
	Maxitem = 2;
	DropGold(162, 234);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);



	DropItem(II_GEN_GEM_GEM_ZEMMARK, 200000000, 0, 1);


	

	SetCallHelper( 100, MI_RISEM1, 2, TRUE);
	SetCallHelper( 100, MI_RISEM2, 2, TRUE);

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low
			
                        Rangeattack 6            
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_RISEM4
{

	Maxitem = 5;
	DropGold(397, 576);
	DropItem(II_GEN_JEW_RIN_DEXRING, 4166000, 5, 1);
	DropItem(II_GEN_JEW_RIN_STARING, 4166000, 5, 1);

	DropKind(IK3_SWD, 57, 64);
	DropKind(IK3_AXE, 57, 64);
	DropKind(IK3_CHEERSTICK, 57, 64);
	DropKind(IK3_KNUCKLEHAMMER, 57, 64);
	DropKind(IK3_WAND, 57, 64);
	DropKind(IK3_STAFF, 57, 64);
	DropKind(IK3_HELMET, 57, 64);
	DropKind(IK3_SUIT, 57, 64);
	DropKind(IK3_GAUNTLET, 57, 64);
	DropKind(IK3_BOOTS, 57, 64);
	DropKind(IK3_SHIELD, 57, 64);
	DropKind(IK3_BOW, 57, 64);
	DropKind(IK3_YOYO, 57, 64);

	DropItem(II_GEN_MAT_ELE_DESERT, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_DESERT, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropItem(II_GEN_GEM_GEM_ZEMMARK, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_ZEMMARK, 1000000000, 0, 1);

	DropItem(II_GEN_POT_DRI_VITAL600,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_SEVENTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_COO_FISHSTEW, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_FISHSTEW, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_FISHSTEW, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_FRUITPARFAIT, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_FRUITPARFAIT, 600000001, 0, 1);

	SetCallHelper( 100, MI_RISEM3, 5, TRUE);
	SetCallHelper( 100, MI_RISEM2, 5, TRUE);

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                        Berserk 30 1.5
			summon 10 1 MI_RISEM3
			recovery 10 40 100 m            
                    }
		#move
		    {
			
		    }	
   	}               
}

//���ͺ�Ŭ
MI_NUCTUVEHICLE1
{
	Maxitem = 2;
	DropGold(156, 228);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	

	DropItem(II_GEN_GEM_GEM_NUCTUWHEEL, 300000000, 0, 1);


	

	SetCallHelper( 100, MI_NUCTUVEHICLE3, 1, TRUE);
	SetCallHelper( 100, MI_NUCTUVEHICLE2, 2, TRUE);

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning sam 
                        Rangeattack 6            
                    }
		#move
		    {
			loot d 5
		    }	
   	}               
}

MI_NUCTUVEHICLE2
{
	Maxitem = 2;
	DropGold(156, 228);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	

	DropItem(II_GEN_GEM_GEM_NUCTUWHEEL, 200000000, 0, 1);


	

	SetCallHelper( 100, MI_NUCTUVEHICLE1, 2, TRUE);
	SetCallHelper( 100, MI_NUCTUVEHICLE3, 1, TRUE);

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack  
                        berserk 30 1.3            
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_NUCTUVEHICLE3
{
	Maxitem = 2;
	DropGold(156, 228);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);


	DropItem(II_GEN_GEM_GEM_NUCTUWHEEL, 200000000, 0, 1);


	

	SetCallHelper( 100, MI_NUCTUVEHICLE1, 2, TRUE);
	SetCallHelper( 100, MI_NUCTUVEHICLE2, 2, TRUE);

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low
			
                        Rangeattack 10            
                    }
		#move
		    {
			
		    }	
   	}               

}

MI_NUCTUVEHICLE4
{
	Maxitem = 5;
	DropGold(386, 560);

	DropItem(II_GEN_JEW_RIN_STRRING, 4166000, 5, 1);
	DropItem(II_GEN_JEW_RIN_INTRING, 4166000, 5, 1);

	DropKind(IK3_SWD, 55, 62);
	DropKind(IK3_AXE, 55, 62);
	DropKind(IK3_CHEERSTICK, 55, 62);
	DropKind(IK3_KNUCKLEHAMMER, 55, 62);
	DropKind(IK3_WAND, 55, 62);
	DropKind(IK3_STAFF, 55, 62);
	DropKind(IK3_HELMET, 55, 62);
	DropKind(IK3_SUIT, 55, 62);
	DropKind(IK3_GAUNTLET, 55, 62);
	DropKind(IK3_BOOTS, 55, 62);
	DropKind(IK3_SHIELD, 55, 62);
	DropKind(IK3_BOW, 55, 62);
	DropKind(IK3_YOYO, 55, 62);

	DropItem(II_GEN_MAT_ELE_RIVER, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_RIVER, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropItem(II_GEN_GEM_GEM_NUCTUWHEEL, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_NUCTUWHEEL, 1000000000, 0, 1);

	DropItem(II_GEN_POT_DRI_VITAL600,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_SEVENTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_COO_FISHSTEW, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_FISHSTEW, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_FISHSTEW, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_FRUITICEWATER, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_FRUITICEWATER, 600000001, 0, 1);

	SetCallHelper( 100, MI_NUCTUVEHICLE3, 5, TRUE);
	SetCallHelper( 100, MI_NUCTUVEHICLE2, 5, TRUE);

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                        Berserk 30 1.5
			summon 10 1 MI_NUCTUVEHICLE3
			recovery 10 50 100 m 
                         
                                    
                    }
		#move
		    {
			loot d 5
		    }	
   	}               

}

//����
MI_ZOMBIGER1
{
	Maxitem = 2;
	DropGold(126, 182);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	

	DropItem(II_GEN_GEM_GEM_ZOMBYHOE, 300000000, 0, 1);

	SetCallHelper( 100, MI_ZOMBIGER3, 1, TRUE);
	SetCallHelper( 100, MI_ZOMBIGER2, 2, TRUE);

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 50 
                        Berserk 20 1.2            
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_ZOMBIGER2
{

	Maxitem = 2;
	DropGold(126, 182);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);



	DropItem(II_GEN_GEM_GEM_ZOMBYHOE, 200000000, 0, 1);


	

	SetCallHelper( 100, MI_ZOMBIGER1, 2, TRUE);
	SetCallHelper( 100, MI_ZOMBIGER3, 1, TRUE);

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			KeepRangeattack 10
			evade 30            
                    }
		#move
		    {
			loot d 5
		    }	
   	}               
}

MI_ZOMBIGER3
{
	Maxitem = 2;
	DropGold(126, 182);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);



	DropItem(II_GEN_GEM_GEM_ZOMBYHOE, 200000000, 0, 1);


	

	SetCallHelper( 100, MI_ZOMBIGER1, 2, TRUE);
	SetCallHelper( 100, MI_ZOMBIGER2, 2, TRUE);

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low
                        
                        Rangeattack 6            
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_ZOMBIGER4
{
	Maxitem = 5;
	DropGold(313, 454);

	DropItem(II_GEN_JEW_NEC_FPNECKLACE, 4166000, 14, 1);

	DropKind(IK3_SWD, 56, 63);
	DropKind(IK3_AXE, 56, 63);
	DropKind(IK3_CHEERSTICK, 56, 63);
	DropKind(IK3_KNUCKLEHAMMER, 56, 63);
	DropKind(IK3_WAND, 56, 63);
	DropKind(IK3_STAFF, 56, 63);
	DropKind(IK3_HELMET, 56, 63);
	DropKind(IK3_SUIT, 56, 63);
	DropKind(IK3_GAUNTLET, 56, 63);
	DropKind(IK3_BOOTS, 56, 63);
	DropKind(IK3_SHIELD, 56, 63);
	DropKind(IK3_BOW, 56, 63);
	DropKind(IK3_YOYO, 56, 63);

	DropItem(II_GEN_MAT_ELE_FLAME, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_FLAME, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropItem(II_GEN_GEM_GEM_ZOMBYHOE, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_ZOMBYHOE, 1000000000, 0, 1);

	DropItem(II_GEN_POT_DRI_VITAL600,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_SIXTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_INS_HOTDOG, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_INS_HOTDOG, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_INS_HOTDOG, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_FRUITICEWATER, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_FRUITICEWATER, 600000001, 0, 1);

	SetCallHelper( 100, MI_ZOMBIGER3, 5, TRUE);
	SetCallHelper( 100, MI_ZOMBIGER2, 5, TRUE);

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                        Berserk 30 1.5
			summon 10 1 MI_ZOMBIGER3
			recovery 10 50 100 m         
                    }
		#move
		    {
			loot d 3
		    }	
   	}               
}

//�ش� ��ɿ� ����

MI_FLYBAT1
{
	Maxitem = 4;
	DropGold(45, 66);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	
	
	

	DropItem(II_GEN_GEM_GEM_BATHOOK, 300000000, 0, 1);

	

	SetCallHelper( 100, MI_FLYBAT3, 1, TRUE);
	SetCallHelper( 100, MI_FLYBAT2, 2, TRUE);

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low
                                    
                    }
		#move
		    {
			Loot d 3
		    }	 
   	}               
}
MI_FLYBAT2
{
	Maxitem = 4;
	DropGold(45, 66);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);


	DropItem(II_GEN_GEM_GEM_BATHOOK, 200000000, 0, 1);

	

	SetCallHelper( 100, MI_FLYBAT1, 2, TRUE);
	SetCallHelper( 100, MI_FLYBAT3, 1, TRUE);

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low
                                    
                    }
		#move
		    {
			Loot d 5
		    }	
   	}               
	
}
MI_FLYBAT3
{
	Maxitem = 4;
	DropGold(45, 66);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);


	DropItem(II_GEN_GEM_GEM_BATHOOK, 200000000, 0, 1);

	

	SetCallHelper( 100, MI_FLYBAT1, 2, TRUE);
	SetCallHelper( 100, MI_FLYBAT2, 2, TRUE);

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low
                                    
                    }
		#move
		    {
			Loot d 3
		    }	
   	}               

}
MI_FLYBAT4
{
	Maxitem = 8;
	DropGold(224, 324);
	DropItem(II_GEN_JEW_NEC_MPNECKLACE, 4166000, 7, 1);

	DropKind(IK3_SWD, 19, 26);
	DropKind(IK3_AXE, 19, 26);
	DropKind(IK3_CHEERSTICK, 19, 26);
	DropKind(IK3_KNUCKLEHAMMER, 19, 26);
	DropKind(IK3_WAND, 19, 26);
	DropKind(IK3_STAFF, 19, 26);
	DropKind(IK3_HELMET, 19, 26);
	DropKind(IK3_SUIT, 19, 26);
	DropKind(IK3_GAUNTLET, 19, 26);
	DropKind(IK3_BOOTS, 19, 26);
	DropKind(IK3_SHIELD, 19, 26);
	DropKind(IK3_BOW, 19, 26);
	DropKind(IK3_YOYO, 19, 26);

	DropItem(II_GEN_MAT_ELE_RIVER, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_RIVER, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropItem(II_GEN_GEM_GEM_BATHOOK, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_BATHOOK, 1000000000, 0, 1);

	DropItem(II_GEN_POT_DRI_VITAL200,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_FOUTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_INS_CHOCOLATE, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_INS_CHOCOLATE, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_INS_CHOCOLATE, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_PINEAPPLECONE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_PINEAPPLECONE, 600000001, 0, 1);

	SetCallHelper( 100, MI_FLYBAT3, 5, TRUE);
	SetCallHelper( 100, MI_FLYBAT2, 5, TRUE);

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low
                                    
                    }
		#move
		    {
			Loot d 3
		    }	
   	}               
}


MI_BUCROW1
{
	Maxitem = 4;
	DropGold(54, 78);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);


	DropItem(II_GEN_GEM_GEM_BUCORONG, 300000000, 0, 1);

	
	SetCallHelper( 100, MI_BUCROW2, 2, TRUE);
	SetCallHelper( 100, MI_BUCROW3, 1, TRUE);

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low
                                    
                    }
		#move
		    {
			Loot d 5
		    }	
   	}               


}
MI_BUCROW2
{
	Maxitem = 4;
	DropGold(54, 78);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);



	DropItem(II_GEN_GEM_GEM_BUCORONG, 200000000, 0, 1);

	
	SetCallHelper( 100, MI_BUCROW1, 2, TRUE);
	SetCallHelper( 100, MI_BUCROW3, 1, TRUE);

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low
                                    
                    }
		#move
		    {
			Loot d 5
		    }	 
   	}               
}
MI_BUCROW3
{
	Maxitem = 4;
	DropGold(54, 78);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);


	DropItem(II_GEN_GEM_GEM_BUCORONG, 200000000, 0, 1);

	

	SetCallHelper( 100, MI_BUCROW2, 2, TRUE);
	SetCallHelper( 100, MI_BUCROW1, 2, TRUE);

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low
                                    
                    }
		#move
		    {
			Loot d 3
		    }	
   	}               
}
MI_BUCROW4
{
	Maxitem = 8;
	DropGold(268, 389);

	DropItem(II_GEN_JEW_NEC_FPNECKLACE, 4166000, 11, 1);

	DropKind(IK3_SWD, 31, 38);
	DropKind(IK3_AXE, 31, 38);
	DropKind(IK3_CHEERSTICK, 31, 38);
	DropKind(IK3_KNUCKLEHAMMER, 31, 38);
	DropKind(IK3_WAND, 31, 38);
	DropKind(IK3_STAFF, 31, 38);
	DropKind(IK3_HELMET, 31, 38);
	DropKind(IK3_SUIT, 31, 38);
	DropKind(IK3_GAUNTLET, 31, 38);
	DropKind(IK3_BOOTS, 31, 38);
	DropKind(IK3_SHIELD, 31, 38);
	DropKind(IK3_BOW, 31, 38);
	DropKind(IK3_YOYO, 31, 38);

	DropItem(II_GEN_MAT_ELE_CYCLON, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_CYCLON, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropItem(II_GEN_GEM_GEM_BUCORONG, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_BUCORONG, 1000000000, 0, 1);

	DropItem(II_GEN_POT_DRI_VITAL400,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_FOUTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_INS_MILK, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_INS_MILK, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_INS_MILK, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_BANANAJUJUBAR, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_BANANAJUJUBAR, 600000001, 0, 1);

	SetCallHelper( 100, MI_BUCROW2, 5, TRUE);
	SetCallHelper( 100, MI_BUCROW3, 5, TRUE);

	m_nAttackFirstRange = 10;



	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                        Berserk 30 1.5
			summon 10 1 MI_BUCROW3
			recovery 10 50 100 m
                                    
                    }
		#move
		    {
			Loot d 3
		    }	
   	}               
}


MI_SCOPICON1
{
	Maxitem = 4;
	DropGold(63, 91);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);


	DropItem(II_GEN_GEM_GEM_SCOTOOTH, 300000000, 0, 1);


	

	SetCallHelper( 100, MI_SCOPICON2, 2, TRUE);
	SetCallHelper( 100, MI_SCOPICON3, 1, TRUE);

	m_nAttackFirstRange = 10;



	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low
                                    
                    }
		#move
		    {
			Loot d 3
		    }	
   	}               
}
MI_SCOPICON2
{
	Maxitem = 4;
	DropGold(63, 91);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);



	DropItem(II_GEN_GEM_GEM_SCOTOOTH, 200000000, 0, 1);


	
	SetCallHelper( 100, MI_SCOPICON1, 2, TRUE);
	SetCallHelper( 100, MI_SCOPICON3, 1, TRUE);
	
	m_nAttackFirstRange = 10;
	


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low
                                    
                    }
		#move
		    {
			Loot d 3
		    }	
   	}               
}
MI_SCOPICON3
{
	Maxitem = 4;
	DropGold(63, 91);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	

	DropItem(II_GEN_GEM_GEM_SCOTOOTH, 200000000, 0, 1);


	

	SetCallHelper( 100, MI_SCOPICON2, 2, TRUE);
	SetCallHelper( 100, MI_SCOPICON1, 2, TRUE);

	m_nAttackFirstRange = 10;



	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low
                                    
                    }
		#move
		    {
			Loot d 3
		    }	
   	}               
}
MI_SCOPICON4
{
	Maxitem = 8;
	DropGold(313, 454);

	DropItem(II_GEN_JEW_NEC_FPNECKLACE, 4166000, 14, 1);

	DropKind(IK3_SWD, 41, 48);
	DropKind(IK3_AXE, 41, 48);
	DropKind(IK3_CHEERSTICK, 41, 48);
	DropKind(IK3_KNUCKLEHAMMER, 41, 48);
	DropKind(IK3_WAND, 41, 48);
	DropKind(IK3_STAFF, 41, 48);
	DropKind(IK3_HELMET, 41, 48);
	DropKind(IK3_SUIT, 41, 48);
	DropKind(IK3_GAUNTLET, 41, 48);
	DropKind(IK3_BOOTS, 41, 48);
	DropKind(IK3_SHIELD, 41, 48);
	DropKind(IK3_BOW, 41, 48);
	DropKind(IK3_YOYO, 41, 48);

	DropItem(II_GEN_MAT_ELE_DESERT, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_DESERT, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropItem(II_GEN_GEM_GEM_SCOTOOTH, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_SCOTOOTH, 1000000000, 0, 1);

	DropItem(II_GEN_POT_DRI_VITAL500,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_FIFTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_INS_BREAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_INS_BREAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_INS_BREAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_FRUITJUICE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_FRUITJUICE, 600000001, 0, 1);



	SetCallHelper( 100, MI_SCOPICON2, 5, TRUE);
	SetCallHelper( 100, MI_SCOPICON3, 5, TRUE);

	m_nAttackFirstRange = 10;



	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                        Berserk 30 1.5
			summon 10 1 MI_SCOPICON3
			recovery 10 30 100 m
                                    
                    }
		#move
		    {
			Loot d 3
		    }	
   	}               
}


MI_TRANGFOMA1
{
	Maxitem = 4;
	DropGold(70, 102);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);



	DropItem(II_GEN_GEM_GEM_RANGLASS, 300000000, 0, 1);


	

	SetCallHelper( 100, MI_TRANGFOMA2, 2, TRUE);
	SetCallHelper( 100, MI_TRANGFOMA3, 1, TRUE);

	m_nAttackFirstRange = 10;



	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low
                                    
                    }
		#move
		    {
			Loot d 5
		    }	
   	}               
}
MI_TRANGFOMA2
{
	Maxitem = 4;
	DropGold(70, 102);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);



	DropItem(II_GEN_GEM_GEM_RANGLASS, 200000000, 0, 1);


	
	SetCallHelper( 100, MI_TRANGFOMA1, 2, TRUE);
	SetCallHelper( 100, MI_TRANGFOMA3, 1, TRUE);

	m_nAttackFirstRange = 10;



	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low
                                    
                    }
		#move
		    {
			Loot d 5
		    }	
   	}               
}
MI_TRANGFOMA3
{
	Maxitem = 4;
	DropGold(70, 102);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);



	DropItem(II_GEN_GEM_GEM_RANGLASS, 200000000, 0, 1);


	

	SetCallHelper( 100, MI_TRANGFOMA2, 2, TRUE);
	SetCallHelper( 100, MI_TRANGFOMA1, 2, TRUE);

	m_nAttackFirstRange = 10;



	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low
                                    
                    }
		#move
		    {
			Loot d 5
		    }	
   	}               
}
MI_TRANGFOMA4
{
	Maxitem = 8;
	DropGold(352, 511);

	DropItem(II_GEN_JEW_NEC_HPNECKLACE, 4166000, 6, 1);

	DropKind(IK3_SWD, 49, 56);
	DropKind(IK3_AXE, 49, 56);
	DropKind(IK3_CHEERSTICK, 49, 56);
	DropKind(IK3_KNUCKLEHAMMER, 49, 56);
	DropKind(IK3_WAND, 49, 56);
	DropKind(IK3_STAFF, 49, 56);
	DropKind(IK3_HELMET, 49, 56);
	DropKind(IK3_SUIT, 49, 56);
	DropKind(IK3_GAUNTLET, 49, 56);
	DropKind(IK3_BOOTS, 49, 56);
	DropKind(IK3_SHIELD, 49, 56);
	DropKind(IK3_BOW, 49, 56);
	DropKind(IK3_YOYO, 49, 56);

	DropItem(II_GEN_MAT_ELE_RIVER, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_RIVER, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropItem(II_GEN_GEM_GEM_RANGLASS, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_RANGLASS, 1000000000, 0, 1);

	DropItem(II_GEN_POT_DRI_VITAL500,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_SIXTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_INS_HOTDOG, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_INS_HOTDOG, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_INS_HOTDOG, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_FRUITICEWATER, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_FRUITICEWATER, 600000001, 0, 1);

	SetCallHelper( 100, MI_TRANGFOMA2, 5, TRUE);
	SetCallHelper( 100, MI_TRANGFOMA3, 5, TRUE);

	m_nAttackFirstRange = 10;



	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                        Berserk 30 1.5
			summon 10 1 MI_TRANGFOMA3
			recovery 10 30 100 m
                                    
                    }
		#move
		    {
			Loot d 3
		    }	
   	}               
}
MI_CLOCKWORK1
{
	Maxitem = 8;

	DropItem(II_GEN_JEW_EAR_ATTEARRING, 5000000, 14, 1);
	DropItem(II_GEN_JEW_EAR_DEFEARRING, 10000000, 10, 1);
	DropItem(II_GEN_JEW_EAR_DEFEARRING, 5000000, 14, 1);
	DropItem(II_GEN_JEW_EAR_U_EARRING07, 10000000, 0, 1);
	DropItem(II_GEN_JEW_EAR_U_EARRING08, 5000000, 0, 1);
	DropItem(II_GEN_JEW_EAR_U_EARRING09, 2000000, 0, 1);

        DropItem(II_GEN_JEW_RIN_STRRING, 10000000, 9, 1);	
	DropItem(II_GEN_JEW_RIN_STRRING, 4000000, 15, 1);
//	DropItem(II_GEN_JEW_RIN_STRRING, 2000000, 18, 1);

        DropItem(II_GEN_JEW_RIN_INTRING, 10000000, 9, 1);
	DropItem(II_GEN_JEW_RIN_INTRING, 4000000, 15, 1);
//	DropItem(II_GEN_JEW_RIN_INTRING, 2000000, 18, 1);

	DropItem(II_GEN_JEW_RIN_DEXRING, 10000000, 9, 1);
	DropItem(II_GEN_JEW_RIN_DEXRING, 4000000, 15, 1);
//	DropItem(II_GEN_JEW_RIN_DEXRING, 2000000, 18, 1);

	
        DropItem(II_ARM_ARM_SHI_RUKENSHIA, 300000000, 0, 1);         
        DropItem(II_ARM_ARM_SHI_TOEFFIN, 300000000, 0, 1); //(������ �������� �����)
        DropItem(II_ARM_ARM_SHI_TOEFFIN, 300000000, 0, 1);            
        DropItem(II_ARM_ARM_SHI_CATEPO, 300000000, 0, 1); 

	DropItem(II_WEA_SWO_SET01, 300000000, 0, 1);
	DropItem(II_WEA_AXE_SET01, 300000000, 0, 1);
	DropItem(II_WEA_CHE_SET01, 300000000, 0, 1);
	DropItem(II_WEA_WAN_SET01, 300000000, 0, 1);
	DropItem(II_WEA_STA_SET01, 300000000, 0, 1);
	DropItem(II_WEA_KNU_SET01, 300000000, 0, 1);

	DropItem(II_ARM_M_MER_SET01HELMET, 80000000, 0, 1);
	DropItem(II_ARM_M_MER_SET01SUIT, 50000000, 0, 1);
	DropItem(II_ARM_M_MER_SET01GAUNTLET, 10000000, 0, 1);
	DropItem(II_ARM_M_MER_SET01BOOTS, 10000000, 0, 1);
	DropItem(II_ARM_M_ASS_SET01HELMET, 80000000, 0, 1);
	DropItem(II_ARM_M_ASS_SET01SUIT, 50000000, 0, 1);
	DropItem(II_ARM_M_ASS_SET01GAUNTLET, 10000000, 0, 1);
	DropItem(II_ARM_M_ASS_SET01BOOTS, 10000000, 0, 1);
	DropItem(II_ARM_M_MAG_SET01HELMET, 80000000, 0, 1);
	DropItem(II_ARM_M_MAG_SET01SUIT, 50000000, 0, 1);
	DropItem(II_ARM_M_MAG_SET01GAUNTLET, 10000000, 0, 1);
	DropItem(II_ARM_M_MAG_SET01BOOTS, 10000000, 0, 1);
	DropItem(II_ARM_F_MER_SET01HELMET, 80000000, 0, 1);
	DropItem(II_ARM_F_MER_SET01SUIT, 50000000, 0, 1);
	DropItem(II_ARM_F_MER_SET01GAUNTLET, 10000000, 0, 1);
	DropItem(II_ARM_F_MER_SET01BOOTS, 10000000, 0, 1);
	DropItem(II_ARM_F_ASS_SET01HELMET, 80000000, 0, 1);
	DropItem(II_ARM_F_ASS_SET01SUIT, 50000000, 0, 1);
	DropItem(II_ARM_F_ASS_SET01GAUNTLET, 10000000, 0, 1);
	DropItem(II_ARM_F_ASS_SET01BOOTS, 10000000, 0, 1);
	DropItem(II_ARM_F_MAG_SET01HELMET, 80000000, 0, 1);
	DropItem(II_ARM_F_MAG_SET01SUIT, 50000000, 0, 1);
	DropItem(II_ARM_F_MAG_SET01GAUNTLET, 10000000, 0, 1);
	DropItem(II_ARM_F_MAG_SET01BOOTS, 10000000, 0, 1);
	DropItem(II_ARM_M_ACR_SET01HELMET, 80000000, 0, 1);
	DropItem(II_ARM_M_ACR_SET01SUIT  , 50000000, 0, 1);
	DropItem(II_ARM_M_ACR_SET01GAUNTLET, 10000000, 0, 1);
	DropItem(II_ARM_M_ACR_SET01BOOTS  , 10000000, 0, 1);
	DropItem(II_ARM_F_ACR_SET01HELMET, 80000000, 0, 1);
	DropItem(II_ARM_F_ACR_SET01SUIT, 50000000, 0, 1);
	DropItem(II_ARM_F_ACR_SET01GAUNTLET, 10000000, 0, 1);
	DropItem(II_ARM_F_ACR_SET01BOOTS  , 10000000, 0, 1);
	DropItem(II_GEN_JEW_EAR_ATTEARRING, 3000000000, 12, 1);
	DropItem(II_GEN_JEW_RIN_STRRING, 3000000000, 9, 1);

	m_nAttackFirstRange = 10;



	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 30 2
                        recovery 5 20 100 m            
                    }
		#move
		    {
			
		    }	
   	}               

}


// ���ܼ���3�� ���� ������ ������

MI_GRRR1	// �׸���
{
	Maxitem = 2;
	DropGold(81, 118);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	


	DropItem(II_GEN_GEM_GEM_GRBANDAGE, 300000000, 0, 1);

	
	
	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_GRRR2
{
	Maxitem = 2;
	DropGold(82, 119);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);


	DropItem(II_GEN_GEM_GEM_GRBANDAGE, 200000000, 0, 1);

	

	m_nAttackFirstRange = 10;

	
	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack  
                                    
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_GRRR3
{
	Maxitem = 2;
	DropGold(84, 121);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	


	DropItem(II_GEN_GEM_GEM_GRBANDAGE, 200000000, 0, 1);

	

	m_nAttackFirstRange = 10;

	
	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low
                        Rangeattack 6            
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_GRRR4
{
	Maxitem = 5;
	DropGold(616, 893);

	DropItem(II_WEA_SWO_ANGEL, 2700000, 0, 1);
	DropItem(II_WEA_SWT_ANGEL, 2700000, 0, 1);
	DropItem(II_WEA_AXE_ANGEL, 2700000, 0, 1);
	DropItem(II_WEA_AXT_ANGEL, 2700000, 0, 1);
	DropItem(II_WEA_KNU_ANGEL, 2700000, 0, 1);
	DropItem(II_WEA_CHE_ANGEL, 2700000, 0, 1);
	DropItem(II_WEA_WAN_ANGEL, 2700000, 0, 1);
	DropItem(II_WEA_STA_ANGEL, 2700000, 0, 1);
	DropItem(II_WEA_BOW_ANGEL, 2700000, 0, 1);
	DropItem(II_WEA_YOY_ANGEL, 2700000, 0, 1);

	DropItem(II_GEN_JEW_RIN_STRRING, 4166000, 4, 1);
	DropItem(II_GEN_JEW_RIN_INTRING, 4166000, 4, 1);

	DropKind(IK3_SWD, 80, 95);
	DropKind(IK3_AXE, 80, 95);
	DropKind(IK3_CHEERSTICK, 80, 95);
	DropKind(IK3_KNUCKLEHAMMER, 80, 95);
	DropKind(IK3_WAND, 80, 95);
	DropKind(IK3_STAFF, 80, 95);
	DropKind(IK3_HELMET, 80, 95);
	DropKind(IK3_SUIT, 80, 95);
	DropKind(IK3_GAUNTLET, 80, 95);
	DropKind(IK3_BOOTS, 80, 95);
	DropKind(IK3_SHIELD, 80, 95);
	DropKind(IK3_BOW, 80, 95);
	DropKind(IK3_YOYO, 80, 95);
	DropKind(IK3_THSWD, 80, 95);
	DropKind(IK3_THAXE, 80, 95);

	DropItem(II_GEN_MAT_ELE_RIVER, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_RIVER, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropItem(II_GEN_GEM_GEM_GRBANDAGE, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_GRBANDAGE, 1000000000, 0, 1);

	DropItem(II_GEN_POT_DRI_VITAL800,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_EIGHTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);

	

	m_nAttackFirstRange = 10;
	

	
	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                        Berserk 30 1.5
			summon 10 1 MI_GRRR3
			recovery 10 30 100 m            
                    }
		#move
		    {
			loot d 5
		    {
			
		    }	
   	}               
}
}
MI_KRRR
{
	Maxitem = 25;
	DropGold(120, 155);

	DropItem(II_GEN_MAT_ORICHALCUM01, 7500000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 28880000, 0, 1);

        DropItem(II_GEN_GEM_GEM_POPORAM, 1800000000, 0, 1);		//	������
	DropItem(II_GEN_GEM_GEM_SLAIN, 1800000000, 0, 1);		//	������
	DropItem(II_GEN_GEM_GEM_TARINROOT, 1800000000, 0, 1);		//	Ÿ���Ѹ�
	DropItem(II_GEN_GEM_GEM_STARSTONE, 1800000000, 0, 1);		//	����
	DropItem(II_GEN_GEM_GEM_GOLDENWING, 1800000000, 0, 1);		//	Ȳ�ݳ���
	DropItem(II_GEN_GEM_GEM_BLUEHONEY, 1800000000, 0, 1);		//	�������
	DropItem(II_GEN_GEM_GEM_MIADOLL, 1800000000, 0, 1);		//	�̾��� ����
	DropItem(II_GEN_GEM_GEM_FURIOUSMATCH, 1800000000, 0, 1);	//	��ȭ����
	DropItem(II_GEN_GEM_GEM_CARDRIN, 1800000000, 0, 1);		//	ī�帰
	DropItem(II_GEN_GEM_GEM_HAMMARBLE, 1800000000, 0, 1);		//	�ܸ���
	DropItem(II_GEN_GEM_GEM_GIGGLANDE, 1800000000, 0, 1);		//	��۷���
	DropItem(II_GEN_GEM_GEM_MOONSTONE, 1800000000, 0, 1);		//	���弮
	DropItem(II_GEN_GEM_GEM_BOBAND, 1800000000, 0, 1);		//	������
	DropItem(II_GEN_GEM_GEM_DUMBLING, 1800000000, 0, 1);		//	������
	DropItem(II_GEN_GEM_GEM_KALIN, 1800000000, 0, 1);		//	Į�������
	DropItem(II_GEN_GEM_GEM_CLOCKHEART, 1800000000, 0, 1);		//	Ŭ����Ʈ
	DropItem(II_GEN_GEM_GEM_TOMBMARBLE, 1800000000, 0, 1);		//	������
	DropItem(II_GEN_GEM_GEM_GOLDENFIST, 1800000000, 0, 1);		//	Ȳ���ָ�
	DropItem(II_GEN_GEM_GEM_ORBRIN, 1800000000, 0, 1);		//	���기
	DropItem(II_GEN_GEM_GEM_GOLDENCUP, 1800000000, 0, 1);		//	Ȳ����

	DropItem(II_GEN_MAT_ELE_CANDLE, 14000000, 0, 1);		//	ĵ�� ī��
	DropItem(II_GEN_MAT_ELE_RAIN, 14000000, 0, 1);			//	���� ī��
	DropItem(II_GEN_MAT_ELE_BREEZE, 14000000, 0, 1);		//	�긮�� ī��
	DropItem(II_GEN_MAT_ELE_SPARK, 14000000, 0, 1);		        //	����ũ ī��
        DropItem(II_GEN_MAT_ELE_SAND, 14000000, 0, 1);                  //      �ڵ� ī��
	DropItem(II_GEN_MAT_ELE_FLAME, 10000000, 0, 1);		        //	��ġ ī��
	DropItem(II_GEN_MAT_ELE_RIVER, 10000000, 0, 1);			//	����ũ ī��
	DropItem(II_GEN_MAT_ELE_GENERATOR, 10000000, 0, 1);		//	�������� ī��
	DropItem(II_GEN_MAT_ELE_DESERT, 10000000, 0, 1);		        //	���� ī��
	DropItem(II_GEN_MAT_ELE_CYCLON, 10000000, 0, 1);			//	���� ī��
	DropItem(II_GEN_MAT_ELE_FLAME, 5000000, 0, 1);		        //	�÷��� ī��
	DropItem(II_GEN_MAT_ELE_RIVER, 5000000, 0, 1);		        //	���� ī��
	DropItem(II_GEN_MAT_ELE_GENERATOR, 5000000, 0, 1);		//	���ʷ����� ī��
	DropItem(II_GEN_MAT_ELE_DESERT, 5000000, 0, 1);			//	����Ʈ ī��
	DropItem(II_GEN_MAT_ELE_CYCLON, 5000000, 0, 1);			//	����Ŭ�� ī��

	DropItem(II_WEA_SWO_CLIP, 50000000, 0, 1);			//	Ŭ���ҵ�
	DropItem(II_WEA_SWO_TAO, 45000000, 0, 1);			//	Ÿ���ҵ�
	DropItem(II_WEA_SWO_SEPAL, 35000000, 0, 1);			//	���޼ҵ�(������ �������� �����)
	DropItem(II_WEA_WAN_RUBY, 50000000, 0, 1);			//	���ϵ�
	DropItem(II_WEA_WAN_KALIS, 45000000, 0, 1);			//	Į�����ϵ�
	DropItem(II_WEA_WAN_POLY, 35000000, 0, 1);			//	�����ϵ�(������ �������� �����)
	DropItem(II_WEA_CHEE_SAYRAM, 50000000, 0, 1);			//	���̶���ƽ
	DropItem(II_WEA_CHEE_SAINT, 45000000, 0, 1);			//	����Ʈ��ƽ
	DropItem(II_WEA_CHEE_FLURY, 35000000, 0, 1);			//	�÷�����ƽ(������ �������� �����)
	DropItem(II_WEA_AXE_DRONE, 50000000, 0, 1);			//	��п���
	DropItem(II_WEA_AXE_PROEM, 45000000, 0, 1);			//	���ο�����
	DropItem(II_WEA_AXE_CORIN, 35000000, 0, 1);			//	�ڸ�����(������ �������� �����)
	DropItem(II_WEA_STA_ADDSELF, 50000000, 0, 1);			//	�ֵ弿��������
	DropItem(II_WEA_STA_SIGN, 45000000, 0, 1);			//	���ν�����
	DropItem(II_WEA_STA_IGNIS, 35000000, 0, 1);			//	�̱״Ͻ�������(������ �������� �����)
	DropItem(II_WEA_KNU_SIDE, 50000000, 0, 1);			//	���̵��Ŭ
	DropItem(II_WEA_KNU_TALIN, 45000000, 0, 1);			//	Ż����Ŭ
	DropItem(II_WEA_KNU_RIGOR, 35000000, 0, 1);			//	���ų�Ŭ(������ �������� �����)
	DropItem(II_WEA_YOY_EMPORE, 50000000, 0, 1);			//	������
	DropItem(II_WEA_YOY_DICEIN, 45000000, 0, 1);			//	����
	DropItem(II_WEA_YOY_MIRAGL, 35000000, 0, 1);			//      �̶���(������ �������� �����)
	DropItem(II_WEA_BOW_REDIAN, 50000000, 0, 1);			//	����Ƴ� ����
        DropItem(II_WEA_BOW_CRISTI, 45000000, 0, 1);			//	ũ����Ƽ�� ����
	DropItem(II_WEA_BOW_IRUN  , 35000000, 0, 1);			//	���̷麸��

	DropItem(II_ARM_M_MER_HELMET0201, 70000000, 0, 1);		//	���� ���
	DropItem(II_ARM_M_MER_SUIT0201, 60000000, 0, 1);		//	���� ��Ʈ
	DropItem(II_ARM_M_MER_GAUNTLET0201, 70000000, 0, 1);		//	���� ��Ʋ��
	DropItem(II_ARM_M_MER_BOOTS0201, 70000000, 0, 1);		//	���� ����
	DropItem(II_ARM_M_MER_HELMET0301, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_M_MER_SUIT0301, 60000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_M_MER_GAUNTLET0301, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_M_MER_BOOTS0301, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_F_MER_HELMET0201, 70000000, 0, 1);		//	���� ���
	DropItem(II_ARM_F_MER_SUIT0201, 60000000, 0, 1);		//	���� ��Ʈ
	DropItem(II_ARM_F_MER_GAUNTLET0201, 70000000, 0, 1);		//	���� ��Ʋ��
	DropItem(II_ARM_F_MER_BOOTS0201, 70000000, 0, 1);		//	���� ����
	DropItem(II_ARM_F_MER_HELMET0301, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_F_MER_SUIT0301, 60000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_F_MER_GAUNTLET0301, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_F_MER_BOOTS0301, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_M_ASS_HELMET0201, 70000000, 0, 1);		//	���� ���
	DropItem(II_ARM_M_ASS_SUIT0201, 60000000, 0, 1);		//	���� ��Ʈ
	DropItem(II_ARM_M_ASS_GAUNTLET0201, 70000000, 0, 1);		//	���� ��Ʋ��
	DropItem(II_ARM_M_ASS_BOOTS0201, 70000000, 0, 1);		//	���� ����
	DropItem(II_ARM_M_ASS_HELMET0301, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_M_ASS_SUIT0301, 60000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_M_ASS_GAUNTLET0301, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_M_ASS_BOOTS0301, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_F_ASS_HELMET0201, 70000000, 0, 1);		//	���̸��� ���
	DropItem(II_ARM_F_ASS_SUIT0201, 60000000, 0, 1);		//	���̸��� ��Ʈ
	DropItem(II_ARM_F_ASS_GAUNTLET0201, 70000000, 0, 1);		//	���̸��� ��Ʋ��
	DropItem(II_ARM_F_ASS_BOOTS0201, 70000000, 0, 1);		//	���̸��� ����
	DropItem(II_ARM_F_ASS_HELMET0301, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_F_ASS_SUIT0301, 60000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_F_ASS_GAUNTLET0301, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_F_ASS_BOOTS0301, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_M_ACR_HELMET0201, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_M_ACR_SUIT0201, 60000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_M_ACR_GAUNTLET0201, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_M_ACR_BOOTS0201, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_M_ACR_HELMET0301, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_M_ACR_SUIT0301, 60000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_M_ACR_GAUNTLET0301, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_M_ACR_BOOTS0301, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_F_ACR_HELMET0201, 70000000, 0, 1);		//	���ε� ���
	DropItem(II_ARM_F_ACR_SUIT0201, 60000000, 0, 1);		//	���ε� ��Ʈ
	DropItem(II_ARM_F_ACR_GAUNTLET0201, 70000000, 0, 1);		//	���ε� ��Ʋ��
	DropItem(II_ARM_F_ACR_BOOTS0201, 70000000, 0, 1);		//	���ε� ����
	DropItem(II_ARM_F_ACR_HELMET0301, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_F_ACR_SUIT0301, 60000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_F_ACR_GAUNTLET0301, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_F_ACR_BOOTS0301, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_M_MAG_HELMET0201, 70000000, 0, 1);		//	���� ���
	DropItem(II_ARM_M_MAG_SUIT0201, 60000000, 0, 1);		//	���� ��Ʈ
	DropItem(II_ARM_M_MAG_GAUNTLET0201, 70000000, 0, 1);		//	���� ��Ʋ��
	DropItem(II_ARM_M_MAG_BOOTS0201, 70000000, 0, 1);		//	���� ����
	DropItem(II_ARM_M_MAG_HELMET0301, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_M_MAG_SUIT0301, 60000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_M_MAG_GAUNTLET0301, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_M_MAG_BOOTS0301, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_F_MAG_HELMET0301, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_F_MAG_SUIT0301, 60000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_F_MAG_GAUNTLET0301, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_F_MAG_BOOTS0301, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_F_MAG_HELMET0201, 70000000, 0, 1);		//	���� ���
	DropItem(II_ARM_F_MAG_SUIT0201, 60000000, 0, 1);		//	���� ��Ʈ
	DropItem(II_ARM_F_MAG_GAUNTLET0201, 70000000, 0, 1);		//	���� ��Ʋ��
	DropItem(II_ARM_F_MAG_BOOTS0201, 70000000, 0, 1);		//	���� ����

	DropItem(II_ARM_ARM_SHI_GYRO, 20000000, 0, 1);		        //	���̷� �ǵ�(������ �������� �����)
	DropItem(II_ARM_ARM_SHI_GYRO, 15000000, 0, 1);		        //	���̷� �ǵ�

	DropItem(II_GEN_FOO_INS_BREAD, 3000000000, 0, 1);		//	�Ļ�
	DropItem(II_GEN_FOO_ICE_FRUITJUICE, 3000000000, 0, 1);		//	�����ֽ�
	DropItem(II_GEN_FOO_COO_FISHSOUP, 3000000000, 0, 1);		//	��������
	DropItem(II_GEN_FOO_COO_SAUSAGECASSEROLE, 3000000000, 0, 1);	//	�ҽ�������
	DropItem(II_GEN_REF_REF_FOUTH, 3000000000, 0, 1);		//	�������� 4��
	DropItem(II_GEN_REF_REF_FIFTH, 3000000000, 0, 1);		//	�������� 5��
	DropItem(II_GEN_REF_REF_SIXTH, 3000000000, 0, 1);		//	�������� 6��
	DropItem(II_GEN_POT_DRI_VITAL400, 3000000000, 0, 1);		//	Ȱ�µ帵ũ 400
	DropItem(II_GEN_POT_DRI_VITAL500, 3000000000, 0, 1);		//	Ȱ�µ帵ũ 500
	DropItem(II_GEN_POT_DRI_VITAL600, 3000000000, 0, 1);		//	Ȱ�µ帵ũ 600
	DropItem(II_GEN_POT_POT_ANTIDOTE, 3000000000, 0, 1);		//	�ص���
	DropItem(II_GEN_POT_POT_CUREDISEASE, 3000000000, 0, 1);		//	����ġ���

	m_nAttackFirstRange = 10;
	

	
	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                        Berserk 30 1.5
			summon 10 1 MI_GRRR3
			recovery 10 30 100 m            
                    }
		#move
		    {
			
		    }	
   	}               
}
MI_MUSHMOOT
{
	Maxitem = 25;
	DropGold(190, 270);

	DropItem(II_GEN_MAT_ORICHALCUM01, 7500000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 28880000, 0, 1);

	DropItem(II_GEN_GEM_GEM_BLUEHONEY, 1800000000, 0, 1);		//	�������
	DropItem(II_GEN_GEM_GEM_MIADOLL, 1800000000, 0, 1);		//	�̾��� ����
	DropItem(II_GEN_GEM_GEM_FURIOUSMATCH, 1800000000, 0, 1);	//	��ȭ����
	DropItem(II_GEN_GEM_GEM_CARDRIN, 1800000000, 0, 1);		//	ī�帰
	DropItem(II_GEN_GEM_GEM_HAMMARBLE, 1800000000, 0, 1);		//	�ܸ���
	DropItem(II_GEN_GEM_GEM_GIGGLANDE, 1800000000, 0, 1);		//	��۷���
	DropItem(II_GEN_GEM_GEM_MOONSTONE, 1800000000, 0, 1);		//	���弮
	DropItem(II_GEN_GEM_GEM_BOBAND, 1800000000, 0, 1);		//	������
	DropItem(II_GEN_GEM_GEM_DUMBLING, 1800000000, 0, 1);		//	������
	DropItem(II_GEN_GEM_GEM_KALIN, 1800000000, 0, 1);		//	Į�������
	DropItem(II_GEN_GEM_GEM_CLOCKHEART, 1800000000, 0, 1);		//	Ŭ����Ʈ
	DropItem(II_GEN_GEM_GEM_TOMBMARBLE, 1800000000, 0, 1);		//	������
	DropItem(II_GEN_GEM_GEM_GOLDENFIST, 1800000000, 0, 1);		//	Ȳ���ָ�
	DropItem(II_GEN_GEM_GEM_ORBRIN, 1800000000, 0, 1);		//	���기
	DropItem(II_GEN_GEM_GEM_GOLDENCUP, 1800000000, 0, 1);		//	Ȳ����
	DropItem(II_GEN_GEM_GEM_TOMA, 1800000000, 0, 1);		//	�丶
	DropItem(II_GEN_GEM_GEM_STEAMTEAR, 1800000000, 0, 1);		//	����Ƽ��
	DropItem(II_GEN_GEM_GEM_KNIGHTLER, 1800000000, 0, 1);		//	����Ʋ��
	DropItem(II_GEN_GEM_GEM_WHEESHOE, 1800000000, 0, 1);		//	�ٽ�
	DropItem(II_GEN_GEM_GEM_DROIL, 1800000000, 0, 1);		//	�����

	DropItem(II_GEN_MAT_ELE_CANDLE, 15000000, 0, 1);		//	ĵ�� ī��
	DropItem(II_GEN_MAT_ELE_RAIN, 15000000, 0, 1);			//	���� ī��
	DropItem(II_GEN_MAT_ELE_BREEZE, 15000000, 0, 1);		//	�긮�� ī��
	DropItem(II_GEN_MAT_ELE_SPARK, 15000000, 0, 1);		        //	����ũ ī��
        DropItem(II_GEN_MAT_ELE_SAND, 15000000, 0, 1);                  //      �ڵ� ī��
	DropItem(II_GEN_MAT_ELE_FLAME, 13000000, 0, 1);		        //	��ġ ī��
	DropItem(II_GEN_MAT_ELE_RIVER, 13000000, 0, 1);			//	����ũ ī��
	DropItem(II_GEN_MAT_ELE_GENERATOR, 13000000, 0, 1);		//	�������� ī��
	DropItem(II_GEN_MAT_ELE_DESERT, 13000000, 0, 1);		        //	���� ī��
	DropItem(II_GEN_MAT_ELE_CYCLON, 13000000, 0, 1);			//	���� ī��
	DropItem(II_GEN_MAT_ELE_FLAME, 10000000, 0, 1);		        //	�÷��� ī��
	DropItem(II_GEN_MAT_ELE_RIVER, 10000000, 0, 1);		        //	���� ī��
	DropItem(II_GEN_MAT_ELE_GENERATOR, 10000000, 0, 1);		//	���ʷ����� ī��
	DropItem(II_GEN_MAT_ELE_DESERT, 10000000, 0, 1);		//	����Ʈ ī��
	DropItem(II_GEN_MAT_ELE_CYCLON, 10000000, 0, 1);		//	����Ŭ�� ī��

	DropItem(II_WEA_SWO_CYLOS, 50000000, 0, 1);			//	�Ƿν��ҵ�
	DropItem(II_WEA_SWO_INVADER, 45000000, 0, 1);			//	�κ��̴��ҵ�
	DropItem(II_WEA_SWO_STITCH, 35000000, 0, 1);		        //      ��Ƽġ�ҵ�
	DropItem(II_WEA_WAN_MEKERHILL, 50000000, 0, 1);		        //	��Ŀ���ϵ�
	DropItem(II_WEA_WAN_NAZ, 45000000, 0, 1);			//	����ϵ�
	DropItem(II_WEA_WAN_ZEREM, 35000000, 0, 1);		        //      �����ϵ�
	DropItem(II_WEA_CHEE_NINEGALE, 50000000, 0, 1);	         	//	���ΰ��Ͻ�ƽ
	DropItem(II_WEA_CHEE_MIRTH, 45000000, 0, 1);			//	�Ӿ���ƽ
	DropItem(II_WEA_CHEE_SIZZLE, 35000000, 0, 1);		        //      ����ƽ
	DropItem(II_WEA_AXE_CROW, 50000000, 0, 1);			//	ũ�ο쿢��
	DropItem(II_WEA_AXE_RAPTOR, 45000000, 0, 1);			//	���Ϳ���
	DropItem(II_WEA_AXE_BERK, 35000000, 0, 1);		        //      ��ũ����
	DropItem(II_WEA_STA_TEBA, 50000000, 0, 1);			//	�׹ٽ�����
	DropItem(II_WEA_STA_SLINE, 45000000, 0, 1);			//	�����ν�����
	DropItem(II_WEA_STA_STARWHEEL, 35000000, 0, 1);		        //      ��Ÿ�ٽ�����
	DropItem(II_WEA_KNU_RAMPART, 50000000, 0, 1);			//	����Ʈ��Ŭ
	DropItem(II_WEA_KNU_REVENANT, 45000000, 0, 1);			//	������Ʈ��Ŭ
	DropItem(II_WEA_KNU_MARVEL, 35000000, 0, 1);		        //      ������Ŭ
	DropItem(II_WEA_YOY_RIDENE, 50000000, 0, 1);			//	���̵���
	DropItem(II_WEA_YOY_FIREE, 45000000, 0, 1);			//	���̾
	DropItem(II_WEA_YOY_IMMOTE, 35000000, 0, 1);		        //      �̸�Ʈ
	DropItem(II_WEA_BOW_REFOME, 50000000, 0, 1);			//      ������Ƽ����
	DropItem(II_WEA_BOW_CURUSI, 45000000, 0, 1);			//      ũ���� ����(������ �������� �����)
	DropItem(II_WEA_BOW_SIGGER, 35000000, 0, 1);		        //      �������

	DropItem(II_ARM_M_MER_HELMET0301, 70000000, 0, 1);		//	�߷� ���
	DropItem(II_ARM_M_MER_SUIT0301, 60000000, 0, 1);		//	�߷� ��Ʈ
	DropItem(II_ARM_M_MER_GAUNTLET0301, 70000000, 0, 1);		//	�߷� ��Ʋ��
	DropItem(II_ARM_M_MER_BOOTS0301, 70000000, 0, 1);		//	�߷� ����
	DropItem(II_ARM_M_MER_HELMET0401, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_M_MER_SUIT0401, 60000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_M_MER_GAUNTLET0401, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_M_MER_BOOTS0401, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_F_MER_HELMET0301, 70000000, 0, 1);		//	�׷��̽� ���
	DropItem(II_ARM_F_MER_SUIT0301, 60000000, 0, 1);		//	�׷��̽� ��Ʈ
	DropItem(II_ARM_F_MER_GAUNTLET0301, 70000000, 0, 1);		//	�׷��̽� ��Ʋ��
	DropItem(II_ARM_F_MER_BOOTS0301, 70000000, 0, 1);		//	�׷��̽� ����
	DropItem(II_ARM_F_MER_HELMET0401, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_F_MER_SUIT0401, 60000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_F_MER_GAUNTLET0401, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_F_MER_BOOTS0401, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_M_MAG_HELMET0301, 70000000, 0, 1);		//	�ڸ� ���
	DropItem(II_ARM_M_MAG_SUIT0301, 60000000, 0, 1);		//	�ڸ� ��Ʈ
	DropItem(II_ARM_M_MAG_GAUNTLET0301, 70000000, 0, 1);		//	�ڸ� ��Ʋ��
	DropItem(II_ARM_M_MAG_BOOTS0301, 70000000, 0, 1);		//	�ڸ� ����
	DropItem(II_ARM_M_MAG_HELMET0401, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_M_MAG_SUIT0401, 60000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_M_MAG_GAUNTLET0401, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_M_MAG_BOOTS0401, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_F_MAG_HELMET0301, 70000000, 0, 1);		//	���� ���
	DropItem(II_ARM_F_MAG_SUIT0301, 60000000, 0, 1);		//	���� ��Ʈ
	DropItem(II_ARM_F_MAG_GAUNTLET0301, 70000000, 0, 1);		//	���� ��Ʋ��
	DropItem(II_ARM_F_MAG_BOOTS0301, 70000000, 0, 1);		//	���� ����
	DropItem(II_ARM_F_MAG_HELMET0401, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_F_MAG_SUIT0401, 60000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_F_MAG_GAUNTLET0401, 70000000, 0, 1);		//	(������ �������� �����)
        DropItem(II_ARM_F_MAG_BOOTS0401, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_M_ASS_HELMET0301, 70000000, 0, 1);		//	
	DropItem(II_ARM_M_ASS_SUIT0301, 60000000, 0, 1);		//	
	DropItem(II_ARM_M_ASS_GAUNTLET0301, 70000000, 0, 1);		//	
	DropItem(II_ARM_M_ASS_BOOTS0301, 70000000, 0, 1);		//	
	DropItem(II_ARM_M_ASS_HELMET0401, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_M_ASS_SUIT0401, 60000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_M_ASS_GAUNTLET0401, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_M_ASS_BOOTS0401, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_F_ASS_HELMET0301, 70000000, 0, 1);		//	
	DropItem(II_ARM_F_ASS_SUIT0301, 60000000, 0, 1);		//	
	DropItem(II_ARM_F_ASS_GAUNTLET0301, 70000000, 0, 1);		//	
	DropItem(II_ARM_F_ASS_BOOTS0301, 70000000, 0, 1);		//	
	DropItem(II_ARM_F_ASS_HELMET0401, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_F_ASS_SUIT0401, 60000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_F_ASS_GAUNTLET0401, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_F_ASS_BOOTS0401, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_M_ACR_HELMET0301, 70000000, 0, 1);		//	
	DropItem(II_ARM_M_ACR_SUIT0301, 60000000, 0, 1);		//	
	DropItem(II_ARM_M_ACR_GAUNTLET0301, 70000000, 0, 1);		//	
	DropItem(II_ARM_M_ACR_BOOTS0301, 70000000, 0, 1);		//	
	DropItem(II_ARM_M_ACR_HELMET0401, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_M_ACR_SUIT0401, 60000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_M_ACR_GAUNTLET0401, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_M_ACR_BOOTS0401, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_F_ACR_HELMET0301, 70000000, 0, 1);		//	
	DropItem(II_ARM_F_ACR_SUIT0301, 60000000, 0, 1);		//	
	DropItem(II_ARM_F_ACR_GAUNTLET0301, 70000000, 0, 1);		//	
	DropItem(II_ARM_F_ACR_BOOTS0301, 70000000, 0, 1);		//	
	DropItem(II_ARM_F_ACR_HELMET0401, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_F_ACR_SUIT0401, 60000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_F_ACR_GAUNTLET0401, 70000000, 0, 1);		//	(������ �������� �����)
	DropItem(II_ARM_F_ACR_BOOTS0401, 70000000, 0, 1);		//	(������ �������� �����)

	DropItem(II_ARM_ARM_SHI_VORTEX, 20000000, 0, 1);	        //	���ؽ� �ǵ�
	DropItem(II_ARM_ARM_SHI_PLUS, 15000000, 0, 1);		        //	�÷��� �ǵ�(������ �������� �����)

	DropItem(II_GEN_FOO_COO_FISHSTEW, 3000000000, 0, 1);		//	������Ʃ
	DropItem(II_GEN_FOO_ICE_FRUITPARFAIT, 3000000000, 0, 1);	//	�����ĸ���
	DropItem(II_GEN_FOO_INS_HODDUK, 3000000000, 0, 1);		//	ȣ��
	DropItem(II_GEN_FOO_INS_KIMBAP, 3000000000, 0, 1);		//	���
	DropItem(II_GEN_REF_REF_FOUTH, 3000000000, 0, 1);		//	�������� 4��
	DropItem(II_GEN_REF_REF_FIFTH, 3000000000, 0, 1);		//	�������� 5��
	DropItem(II_GEN_REF_REF_SIXTH, 3000000000, 0, 1);		//	�������� 6��
	DropItem(II_GEN_POT_DRI_VITAL500, 3000000000, 0, 1);		//	Ȱ�µ帵ũ 500
	DropItem(II_GEN_POT_DRI_VITAL600, 3000000000, 0, 1);		//	Ȱ�µ帵ũ 600
	DropItem(II_GEN_POT_DRI_VITAL700, 3000000000, 0, 1);		//	Ȱ�µ帵ũ 700
	DropItem(II_GEN_POT_POT_ANTIDOTE, 3000000000, 0, 1);		//	�ص���
	DropItem(II_GEN_POT_POT_CUREDISEASE, 3000000000, 0, 1);		//	����ġ���

	m_nAttackFirstRange = 10;
	

	
	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                        Berserk 30 1.5
			summon 10 1 MI_GRRR3
			recovery 10 30 100 m            
                    }
		#move
		    {
			
		    }	
   	}               
}      

MI_SMALL_MUSHPOIE
{
	Maxitem = 0;

	m_nAttackFirstRange = 10;
	
	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			
                    }
		#move
		    {
			
		    }	
   	}               
}


MI_DUMP1	//����
{
	Maxitem = 2;
	DropGold(84, 122);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);


	DropItem(II_GEN_GEM_GEM_DUMPTIRE, 300000000, 0, 1);

	

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 60 
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_DUMP2
{
	Maxitem = 2;
	DropGold(86, 125);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	

	DropItem(II_GEN_GEM_GEM_DUMPTIRE, 200000000, 0, 1);

	

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack  
                        keeprangeattack 5            
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_DUMP3
{
	Maxitem = 2;
	DropGold(88, 127);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	

	DropItem(II_GEN_GEM_GEM_DUMPTIRE, 200000000, 0, 1);

	
	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low
                        Rangeattack 6            
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_DUMP4
{
	Maxitem = 5;
	DropGold(644, 933);

	DropItem(II_WEA_SWO_ANGEL, 3150000, 0, 1);
	DropItem(II_WEA_SWT_ANGEL, 3150000, 0, 1);
	DropItem(II_WEA_AXE_ANGEL, 3150000, 0, 1);
	DropItem(II_WEA_AXT_ANGEL, 3150000, 0, 1);
	DropItem(II_WEA_KNU_ANGEL, 3150000, 0, 1);
	DropItem(II_WEA_CHE_ANGEL, 3150000, 0, 1);
	DropItem(II_WEA_WAN_ANGEL, 3150000, 0, 1);
	DropItem(II_WEA_STA_ANGEL, 3150000, 0, 1);
	DropItem(II_WEA_BOW_ANGEL, 3150000, 0, 1);
	DropItem(II_WEA_YOY_ANGEL, 3150000, 0, 1);

	DropItem(II_GEN_JEW_RIN_STRRING, 4166000, 4, 1);
	DropItem(II_GEN_JEW_RIN_INTRING, 4166000, 4, 1);

	DropKind(IK3_SWD, 80, 95);
	DropKind(IK3_AXE, 80, 95);
	DropKind(IK3_CHEERSTICK, 80, 95);
	DropKind(IK3_KNUCKLEHAMMER, 80, 95);
	DropKind(IK3_WAND, 80, 95);
	DropKind(IK3_STAFF, 80, 95);
	DropKind(IK3_HELMET, 80, 95);
	DropKind(IK3_SUIT, 80, 95);
	DropKind(IK3_GAUNTLET, 80, 95);
	DropKind(IK3_BOOTS, 80, 95);
	DropKind(IK3_SHIELD, 80, 95);
	DropKind(IK3_BOW, 80, 95);
	DropKind(IK3_YOYO, 80, 95);
	DropKind(IK3_THSWD, 80, 95);
	DropKind(IK3_THAXE, 80, 95);

	DropItem(II_GEN_MAT_ELE_DESERT, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_DESERT, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropItem(II_GEN_GEM_GEM_DUMPTIRE, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_DUMPTIRE, 1000000000, 0, 1);

	DropItem(II_GEN_POT_DRI_VITAL800,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_EIGHTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);

	
	m_nAttackFirstRange = 10;

	
	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                        recovery 20 30 100 a
			Berserk 30 1.8
			summon 10 1 MI_DUMP3            
                    }
		#move
		    {
			loot d 3
		    }	
   	}               

}

MI_NAUTREPY1
{
	Maxitem = 2;
	DropGold(61, 89);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);



	DropItem(II_GEN_GEM_GEM_REPYGLE, 300000000, 0, 1);

	

	m_nAttackFirstRange = 10;



	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_NAUTREPY2
{
	Maxitem = 2;
	DropGold(62, 90);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	
	DropItem(II_GEN_GEM_GEM_REPYGLE, 200000000, 0, 1);

	

	m_nAttackFirstRange = 10;



	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack  
                                   
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_NAUTREPY3
{
	Maxitem = 2;
	DropGold(63, 91);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	

	DropItem(II_GEN_GEM_GEM_REPYGLE, 200000000, 0, 1);

	

	m_nAttackFirstRange = 10;



	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low
                                    
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_NAUTREPY4
{
	Maxitem = 5;
	DropGold(464, 673);

	DropItem(II_WEA_SWO_SUHO, 3150000, 0, 1);
	DropItem(II_WEA_SWT_SUHO, 3150000, 0, 1);
	DropItem(II_WEA_AXE_SUHO, 3150000, 0, 1);
	DropItem(II_WEA_AXT_SUHO, 3150000, 0, 1);
	DropItem(II_WEA_KNU_SUHO, 3150000, 0, 1);
	DropItem(II_WEA_CHE_SUHO, 3150000, 0, 1);
	DropItem(II_WEA_WAN_SUHO, 3150000, 0, 1);
	DropItem(II_WEA_STA_SUHO, 3150000, 0, 1);
	DropItem(II_WEA_BOW_SUHO, 3150000, 0, 1);
	DropItem(II_WEA_YOY_SUHO, 3150000, 0, 1);


	DropItem(II_GEN_JEW_RIN_STRRING, 4166000, 4, 1);
	DropItem(II_GEN_JEW_RIN_INTRING, 4166000, 4, 1);

	DropKind(IK3_SWD, 70, 76);
	DropKind(IK3_AXE, 70, 76);
	DropKind(IK3_CHEERSTICK, 70, 76);
	DropKind(IK3_KNUCKLEHAMMER, 70, 76);
	DropKind(IK3_WAND, 70, 76);
	DropKind(IK3_STAFF, 70, 76);
	DropKind(IK3_HELMET, 70, 76);
	DropKind(IK3_SUIT, 70, 76);
	DropKind(IK3_GAUNTLET, 70, 76);
	DropKind(IK3_BOOTS, 70, 76);
	DropKind(IK3_SHIELD, 70, 76);
	DropKind(IK3_BOW, 70, 76);
	DropKind(IK3_YOYO, 70, 76);
	DropKind(IK3_THSWD, 70, 76);
	DropKind(IK3_THAXE, 70, 76);

	DropItem(II_GEN_MAT_ELE_DESERT, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_DESERT, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropItem(II_GEN_GEM_GEM_REPYGLE, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_REPYGLE, 1000000000, 0, 1);

	DropItem(II_GEN_POT_DRI_VITAL800,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_EIGHTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);

	

	m_nAttackFirstRange = 10;
	
	
	
	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                        recovery 10 20 100 a
			Berserk 30 1.5
			summon 10 1 MI_NAUTREPY3            
                    }
		#move
		    {
			loot d 4
		    }	
   	}               

}

MI_BOO1
{
	Maxitem = 2;
	DropGold(64, 93);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);


	DropItem(II_GEN_GEM_GEM_BOOPOSN, 300000000, 0, 1);

	

	m_nAttackFirstRange = 10;



	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			 
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_BOO2
{
	Maxitem = 2;
	DropGold(66, 96);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	
	DropItem(II_GEN_GEM_GEM_BOOPOSN, 200000000, 0, 1);

	

	m_nAttackFirstRange = 10;



	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack  
                                   
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_BOO3
{
	Maxitem = 2;
	DropGold(67, 97);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	

	DropItem(II_GEN_GEM_GEM_BOOPOSN, 200000000, 0, 1);

	

	m_nAttackFirstRange = 10;



	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low
                                    
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_BOO4
{
	Maxitem = 5;
	DropGold(492, 714);

	DropItem(II_WEA_SWO_SUHO, 4500000, 0, 1);
	DropItem(II_WEA_SWT_SUHO, 4500000, 0, 1);
	DropItem(II_WEA_AXE_SUHO, 4500000, 0, 1);
	DropItem(II_WEA_AXT_SUHO, 4500000, 0, 1);
	DropItem(II_WEA_KNU_SUHO, 4500000, 0, 1);
	DropItem(II_WEA_CHE_SUHO, 4500000, 0, 1);
	DropItem(II_WEA_WAN_SUHO, 4500000, 0, 1);
	DropItem(II_WEA_STA_SUHO, 4500000, 0, 1);
	DropItem(II_WEA_BOW_SUHO, 4500000, 0, 1);
	DropItem(II_WEA_YOY_SUHO, 4500000, 0, 1);

	DropItem(II_GEN_JEW_RIN_STRRING, 4166000, 4, 1);
	DropItem(II_GEN_JEW_RIN_INTRING, 4166000, 4, 1);

	DropKind(IK3_SWD, 70, 81);
	DropKind(IK3_AXE, 70, 81);
	DropKind(IK3_CHEERSTICK, 70, 81);
	DropKind(IK3_KNUCKLEHAMMER, 70, 81);
	DropKind(IK3_WAND, 70, 81);
	DropKind(IK3_STAFF, 70, 81);
	DropKind(IK3_HELMET, 70, 81);
	DropKind(IK3_SUIT, 70, 81);
	DropKind(IK3_GAUNTLET, 70, 81);
	DropKind(IK3_BOOTS, 70, 81);
	DropKind(IK3_SHIELD, 70, 81);
	DropKind(IK3_BOW, 70, 81);
	DropKind(IK3_YOYO, 70, 81);
	DropKind(IK3_THSWD, 70, 81);
	DropKind(IK3_THAXE, 70, 81);

	DropItem(II_GEN_MAT_ELE_CYCLON, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_CYCLON, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropItem(II_GEN_GEM_GEM_BOOPOSN, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_BOOPOSN, 1000000000, 0, 1);

	DropItem(II_GEN_POT_DRI_VITAL800,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_EIGHTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);

	

	m_nAttackFirstRange = 10;


	
	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                        recovery 10 30 100 a
			Berserk 30 1.5
			summon 10 1 MI_BOO3            
                    }
		#move
		    {
			loot d 4
		    }	
   	}               

}

MI_HOPPRE1
{
	Maxitem = 2;
	DropGold(68, 98);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);



	DropItem(II_GEN_GEM_GEM_PREWING, 300000000, 0, 1);

	

	m_nAttackFirstRange = 10;
	


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_HOPPRE2
{
	Maxitem = 2;
	DropGold(68, 99);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);


	DropItem(II_GEN_GEM_GEM_PREWING, 200000000, 0, 1);

	
	m_nAttackFirstRange = 10;



	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack  
                        keeprangeattack 8            
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_HOPPRE3
{
	Maxitem = 2;
	DropGold(70, 102);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);


	DropItem(II_GEN_GEM_GEM_PREWING, 200000000, 0, 1);


	

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low
                                   
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_HOPPRE4
{
	Maxitem = 5;
	DropGold(515, 747);

	DropItem(II_WEA_SWO_USU, 3150000, 0, 1);
	DropItem(II_WEA_SWT_USU, 3150000, 0, 1);
	DropItem(II_WEA_AXE_USU, 3150000, 0, 1);
	DropItem(II_WEA_AXT_USU, 3150000, 0, 1);
	DropItem(II_WEA_KNU_USU, 3150000, 0, 1);
	DropItem(II_WEA_CHE_USU, 3150000, 0, 1);
	DropItem(II_WEA_WAN_USU, 3150000, 0, 1);
	DropItem(II_WEA_STA_USU, 3150000, 0, 1);
	DropItem(II_WEA_BOW_USU, 3150000, 0, 1);
	DropItem(II_WEA_YOY_USU, 3150000, 0, 1);

	DropItem(II_GEN_JEW_RIN_STRRING, 4166000, 4, 1);
	DropItem(II_GEN_JEW_RIN_INTRING, 4166000, 4, 1);

	DropKind(IK3_SWD, 71, 81);
	DropKind(IK3_AXE, 71, 81);
	DropKind(IK3_CHEERSTICK, 71, 81);
	DropKind(IK3_KNUCKLEHAMMER, 71, 81);
	DropKind(IK3_WAND, 71, 81);
	DropKind(IK3_STAFF, 71, 81);
	DropKind(IK3_HELMET, 71, 81);
	DropKind(IK3_SUIT, 71, 81);
	DropKind(IK3_GAUNTLET, 71, 81);
	DropKind(IK3_BOOTS, 71, 81);
	DropKind(IK3_SHIELD, 71, 81);
	DropKind(IK3_BOW, 71, 81);
	DropKind(IK3_YOYO, 71, 81);
	DropKind(IK3_THSWD, 71, 81);
	DropKind(IK3_THAXE, 71, 81);

	DropItem(II_GEN_MAT_ELE_RIVER, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_RIVER, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropItem(II_GEN_GEM_GEM_PREWING, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_PREWING, 1000000000, 0, 1);

	DropItem(II_GEN_POT_DRI_VITAL800,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_EIGHTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);

	

	m_nAttackFirstRange = 10;


	
	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                        Berserk 30 1.5
			summon 10 1 MI_HOPPRE3
			recovery 10 20 100 m            
                    }
		#move
		    {
			loot d 3
		    }	
   	}               

}

MI_MUSHPOIE1
{
	Maxitem = 2;
	DropGold(71, 103);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);



	DropItem(II_GEN_GEM_GEM_POIESPORE, 300000000, 0, 1);

	

	m_nAttackFirstRange = 10;

	
	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_MUSHPOIE2
{
	Maxitem = 2;
	DropGold(72, 104);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);


	DropItem(II_GEN_GEM_GEM_POIESPORE, 200000000, 0, 1);

	

	m_nAttackFirstRange = 10;

	
	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack  
                                    
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_MUSHPOIE3
{
	Maxitem = 2;
	DropGold(73, 106);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);



	DropItem(II_GEN_GEM_GEM_POIESPORE, 200000000, 0, 1);

	

	m_nAttackFirstRange = 10;

	
	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low
                                    
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_MUSHPOIE4
{
	Maxitem = 5;
	DropGold(537, 779);

	DropItem(II_WEA_SWO_USU, 3600000, 0, 1);
	DropItem(II_WEA_SWT_USU, 3600000, 0, 1);
	DropItem(II_WEA_AXE_USU, 3600000, 0, 1);
	DropItem(II_WEA_AXT_USU, 3600000, 0, 1);
	DropItem(II_WEA_KNU_USU, 3600000, 0, 1);
	DropItem(II_WEA_CHE_USU, 3600000, 0, 1);
	DropItem(II_WEA_WAN_USU, 3600000, 0, 1);
	DropItem(II_WEA_STA_USU, 3600000, 0, 1);
	DropItem(II_WEA_BOW_USU, 3600000, 0, 1);
	DropItem(II_WEA_YOY_USU, 3600000, 0, 1);

	DropItem(II_GEN_JEW_RIN_STRRING, 4166000, 4, 1);
	DropItem(II_GEN_JEW_RIN_INTRING, 4166000, 4, 1);

	DropKind(IK3_SWD, 73, 83);
	DropKind(IK3_AXE, 73, 83);
	DropKind(IK3_CHEERSTICK, 73, 83);
	DropKind(IK3_KNUCKLEHAMMER, 73, 83);
	DropKind(IK3_WAND, 73, 83);
	DropKind(IK3_STAFF, 73, 83);
	DropKind(IK3_HELMET, 73, 83);
	DropKind(IK3_SUIT, 73, 83);
	DropKind(IK3_GAUNTLET, 73, 83);
	DropKind(IK3_BOOTS, 73, 83);
	DropKind(IK3_SHIELD, 73, 83);
	DropKind(IK3_BOW, 73, 83);
	DropKind(IK3_YOYO, 73, 83);
	DropKind(IK3_THSWD, 73, 83);
	DropKind(IK3_THAXE, 73, 83);

	DropItem(II_GEN_GEM_GEM_POIESPORE, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_POIESPORE, 1000000000, 0, 1);

	DropItem(II_GEN_POT_DRI_VITAL800,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_EIGHTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);

	DropItem(II_GEN_MAT_ELE_CYCLON, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_CYCLON, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	m_nAttackFirstRange = 10;

	
	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                        recovery 10 30 100 a
			Berserk 30 1.8
			summon 10 1 MI_MUSHPOIE3            
                    }
		#move
		    {
			loot d 5
		    }	
   	}               

}

MI_IREN1
{
	Maxitem = 2;
	DropGold(74, 107);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	

	DropItem(II_GEN_GEM_GEM_RENYKEN, 300000000, 0, 1);

	

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 60 
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_IREN2
{
	Maxitem = 2;
	DropGold(75, 109);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);


	DropItem(II_GEN_GEM_GEM_RENYKEN, 200000000, 0, 1);

	

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack  
                                   
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_IREN3
{
	Maxitem = 2;
	DropGold(76, 111);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);


	DropItem(II_GEN_GEM_GEM_RENYKEN, 200000000, 0, 1);

	

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low
                                   
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_IREN4
{
	Maxitem = 5;
	DropGold(560, 812);

	DropItem(II_WEA_SWO_USU, 4050000, 0, 1);
	DropItem(II_WEA_SWT_USU, 4050000, 0, 1);
	DropItem(II_WEA_AXE_USU, 4050000, 0, 1);
	DropItem(II_WEA_AXT_USU, 4050000, 0, 1);
	DropItem(II_WEA_KNU_USU, 4050000, 0, 1);
	DropItem(II_WEA_CHE_USU, 4050000, 0, 1);
	DropItem(II_WEA_WAN_USU, 4050000, 0, 1);
	DropItem(II_WEA_STA_USU, 4050000, 0, 1);
	DropItem(II_WEA_BOW_USU, 4050000, 0, 1);
	DropItem(II_WEA_YOY_USU, 4050000, 0, 1);

	DropItem(II_GEN_JEW_RIN_STRRING, 4166000, 4, 1);
	DropItem(II_GEN_JEW_RIN_INTRING, 4166000, 4, 1);

	DropKind(IK3_SWD, 73, 89);
	DropKind(IK3_AXE, 73, 89);
	DropKind(IK3_CHEERSTICK, 73, 89);
	DropKind(IK3_KNUCKLEHAMMER, 73, 89);
	DropKind(IK3_WAND, 73, 89);
	DropKind(IK3_STAFF, 73, 89);
	DropKind(IK3_HELMET, 73, 89);
	DropKind(IK3_SUIT, 73, 89);
	DropKind(IK3_GAUNTLET, 73, 89);
	DropKind(IK3_BOOTS, 73, 89);
	DropKind(IK3_SHIELD, 73, 89);
	DropKind(IK3_BOW, 73, 89);
	DropKind(IK3_YOYO, 73, 89);
	DropKind(IK3_THSWD, 73, 89);
	DropKind(IK3_THAXE, 73, 89);
	
	DropItem(II_GEN_MAT_ELE_DESERT, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_DESERT, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropItem(II_GEN_GEM_GEM_RENYKEN, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_RENYKEN, 1000000000, 0, 1);

	DropItem(II_GEN_POT_DRI_VITAL800,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_EIGHTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);

	

	m_nAttackFirstRange = 10;

		
	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                        Berserk 30 1.5
			summon 10 1 MI_IREN3
			recovery 10 30 100 a            
                    }
		#move
		    {
			loot d 5
		    }	
   	}               

}

MI_WATANGKA1
{
	Maxitem = 2;
	DropGold(77, 112);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	
	
	DropItem(II_GEN_GEM_GEM_TANGKASK, 300000000, 0, 1);

	m_nAttackFirstRange = 10;



	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_WATANGKA2
{
	Maxitem = 2;
	DropGold(79, 114);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	

	DropItem(II_GEN_GEM_GEM_TANGKASK, 200000000, 0, 1);

	

	m_nAttackFirstRange = 10;

	
	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack  
                        keeprangeattack 5            
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_WATANGKA3
{
	Maxitem = 2;
	DropGold(80, 116);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);



	DropItem(II_GEN_GEM_GEM_TANGKASK, 200000000, 0, 1);

	

	m_nAttackFirstRange = 10;

	
	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low
                        recovery 10 10 100 a            
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_WATANGKA4
{
	Maxitem = 5;
	DropGold(588, 852);

	DropItem(II_WEA_SWO_USU, 4500000, 0, 1);
	DropItem(II_WEA_SWT_USU, 4500000, 0, 1);
	DropItem(II_WEA_AXE_USU, 4500000, 0, 1);
	DropItem(II_WEA_AXT_USU, 4500000, 0, 1);
	DropItem(II_WEA_KNU_USU, 4500000, 0, 1);
	DropItem(II_WEA_CHE_USU, 4500000, 0, 1);
	DropItem(II_WEA_WAN_USU, 4500000, 0, 1);
	DropItem(II_WEA_STA_USU, 4500000, 0, 1);
	DropItem(II_WEA_BOW_USU, 4500000, 0, 1);
	DropItem(II_WEA_YOY_USU, 4500000, 0, 1);

	DropItem(II_GEN_JEW_RIN_STRRING, 4166000, 4, 1);
	DropItem(II_GEN_JEW_RIN_INTRING, 4166000, 4, 1);

	DropKind(IK3_SWD, 73, 92);
	DropKind(IK3_AXE, 73, 92);
	DropKind(IK3_CHEERSTICK, 73, 92);
	DropKind(IK3_KNUCKLEHAMMER, 73, 92);
	DropKind(IK3_WAND, 73, 92);
	DropKind(IK3_STAFF, 73, 92);
	DropKind(IK3_HELMET, 73, 92);
	DropKind(IK3_SUIT, 73, 92);
	DropKind(IK3_GAUNTLET, 73, 92);
	DropKind(IK3_BOOTS, 73, 92);
	DropKind(IK3_SHIELD, 73, 92);
	DropKind(IK3_BOW, 73, 92);
	DropKind(IK3_YOYO, 73, 92);
	DropKind(IK3_THSWD, 73, 92);
	DropKind(IK3_THAXE, 73, 92);

	DropItem(II_GEN_MAT_ELE_RIVER, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_RIVER, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropItem(II_GEN_GEM_GEM_TANGKASK, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_TANGKASK, 1000000000, 0, 1);

	DropItem(II_GEN_POT_DRI_VITAL800,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_EIGHTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);

	
	m_nAttackFirstRange = 10;

	
	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                       	Berserk 30 1.5
			summon 10 1 MI_WATANGKA3            
                    }
		#move
		    {
			loot d 3
		    }	
   	}               

}

MI_ANTIQUERY1
{
	Maxitem = 2;
	DropGold(81, 118);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);


	DropItem(II_GEN_GEM_GEM_ROOTIOE, 300000000, 0, 1);

	

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			 
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_ANTIQUERY2
{
	Maxitem = 2;
	DropGold(82, 119);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);



	DropItem(II_GEN_GEM_GEM_ROOTIOE, 200000000, 0, 1);
	
	

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack  
                                    
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_ANTIQUERY3
{
	Maxitem = 2;
	DropGold(84, 121);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);



	DropItem(II_GEN_GEM_GEM_ROOTIOE, 200000000, 0, 1);

	

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low
                        
			            
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_ANTIQUERY4
{
	Maxitem = 5;
	DropGold(616, 893);

	DropItem(II_WEA_SWO_ANGEL, 2700000, 0, 1);
	DropItem(II_WEA_SWT_ANGEL, 2700000, 0, 1);
	DropItem(II_WEA_AXE_ANGEL, 2700000, 0, 1);
	DropItem(II_WEA_AXT_ANGEL, 2700000, 0, 1);
	DropItem(II_WEA_KNU_ANGEL, 2700000, 0, 1);
	DropItem(II_WEA_CHE_ANGEL, 2700000, 0, 1);
	DropItem(II_WEA_WAN_ANGEL, 2700000, 0, 1);
	DropItem(II_WEA_STA_ANGEL, 2700000, 0, 1);
	DropItem(II_WEA_BOW_ANGEL, 2700000, 0, 1);
	DropItem(II_WEA_YOY_ANGEL, 2700000, 0, 1);

	DropItem(II_GEN_JEW_RIN_STRRING, 4166000, 4, 1);
	DropItem(II_GEN_JEW_RIN_INTRING, 4166000, 4, 1);

	DropKind(IK3_SWD, 80, 95);
	DropKind(IK3_AXE, 80, 95);
	DropKind(IK3_CHEERSTICK, 80, 95);
	DropKind(IK3_KNUCKLEHAMMER, 80, 95);
	DropKind(IK3_WAND, 80, 95);
	DropKind(IK3_STAFF, 80, 95);
	DropKind(IK3_HELMET, 80, 95);
	DropKind(IK3_SUIT, 80, 95);
	DropKind(IK3_GAUNTLET, 80, 95);
	DropKind(IK3_BOOTS, 80, 95);
	DropKind(IK3_SHIELD, 80, 95);
	DropKind(IK3_BOW, 80, 95);
	DropKind(IK3_YOYO, 80, 95);
	DropKind(IK3_THSWD, 80, 95);
	DropKind(IK3_THAXE, 80, 95);

	DropItem(II_GEN_MAT_ELE_RIVER, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_RIVER, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropItem(II_GEN_GEM_GEM_ROOTIOE, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_ROOTIOE, 1000000000, 0, 1);

	DropItem(II_GEN_POT_DRI_VITAL800,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_EIGHTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);

	

	m_nAttackFirstRange = 10;

	
	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                        recovery 10 50 100 a 
			Berserk 30 1.5
			summon 10 1 MI_ANTIQUERY3            
                    }
		#move
		    {
			loot d 4 
		    }	
   	}               

}

MI_LUIA1
{
	Maxitem = 2;
	DropGold(84, 122);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);


	DropItem(II_GEN_GEM_GEM_LUCHEST, 300000000, 0, 1);

	

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 60 
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_LUIA2
{
	Maxitem = 2;
	DropGold(86, 125);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);


	DropItem(II_GEN_GEM_GEM_LUCHEST, 200000000, 0, 1);

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack  
                                    
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_LUIA3
{
	Maxitem = 2;
	DropGold(88, 127);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);


	DropItem(II_GEN_GEM_GEM_LUCHEST, 200000000, 0, 1);

	

	m_nAttackFirstRange = 10;
	

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low
                                    
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_LUIA4
{
	Maxitem = 5;
	DropGold(644, 933);

	DropItem(II_WEA_SWO_ANGEL, 3150000, 0, 1);
	DropItem(II_WEA_SWT_ANGEL, 3150000, 0, 1);
	DropItem(II_WEA_AXE_ANGEL, 3150000, 0, 1);
	DropItem(II_WEA_AXT_ANGEL, 3150000, 0, 1);
	DropItem(II_WEA_KNU_ANGEL, 3150000, 0, 1);
	DropItem(II_WEA_CHE_ANGEL, 3150000, 0, 1);
	DropItem(II_WEA_WAN_ANGEL, 3150000, 0, 1);
	DropItem(II_WEA_STA_ANGEL, 3150000, 0, 1);
	DropItem(II_WEA_BOW_ANGEL, 3150000, 0, 1);
	DropItem(II_WEA_YOY_ANGEL, 3150000, 0, 1);

	DropItem(II_GEN_JEW_RIN_STRRING, 4166000, 4, 1);
	DropItem(II_GEN_JEW_RIN_INTRING, 4166000, 4, 1);

	DropKind(IK3_SWD, 80, 95);
	DropKind(IK3_AXE, 80, 95);
	DropKind(IK3_CHEERSTICK, 80, 95);
	DropKind(IK3_KNUCKLEHAMMER, 80, 95);
	DropKind(IK3_WAND, 80, 95);
	DropKind(IK3_STAFF, 80, 95);
	DropKind(IK3_HELMET, 80, 95);
	DropKind(IK3_SUIT, 80, 95);
	DropKind(IK3_GAUNTLET, 80, 95);
	DropKind(IK3_BOOTS, 80, 95);
	DropKind(IK3_SHIELD, 80, 95);
	DropKind(IK3_BOW, 80, 95);
	DropKind(IK3_YOYO, 80, 95);
	DropKind(IK3_THSWD, 80, 95);
	DropKind(IK3_THAXE, 80, 95);

	DropItem(II_GEN_MAT_ELE_DESERT, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_DESERT, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropItem(II_GEN_GEM_GEM_LUCHEST, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_LUCHEST, 1000000000, 0, 1);

	DropItem(II_GEN_POT_DRI_VITAL800,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_EIGHTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);

	

	m_nAttackFirstRange = 10;

	
	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                        Berserk 30 1.5
			recovery 10 50 100 m
			summon 10 1 MI_LUIA3            
                    }
		#move
		    {
			loot d 3
		    }	
   	}               

}

MI_GONGURY1
{
	Maxitem = 2;
	DropGold(88, 128);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);


	DropItem(II_GEN_GEM_GEM_ERONSIMINT, 300000000, 0, 1);

	

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_GONGURY2
{
	Maxitem = 2;
	DropGold(90, 131);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	

	DropItem(II_GEN_GEM_GEM_ERONSIMINT, 200000000, 0, 1);

	

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack  
                                   
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_GONGURY3
{
	Maxitem = 2;
	DropGold(92, 133);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);



	DropItem(II_GEN_GEM_GEM_ERONSIMINT, 200000000, 0, 1);

	

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low
                        recovery 10 20 100 a            
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_GONGURY4
{
	Maxitem = 5;
	DropGold(672, 974);

	DropItem(II_WEA_SWO_ANGEL, 3600000, 0, 1);
	DropItem(II_WEA_SWT_ANGEL, 3600000, 0, 1);
	DropItem(II_WEA_AXE_ANGEL, 3600000, 0, 1);
	DropItem(II_WEA_AXT_ANGEL, 3600000, 0, 1);
	DropItem(II_WEA_KNU_ANGEL, 3600000, 0, 1);
	DropItem(II_WEA_CHE_ANGEL, 3600000, 0, 1);
	DropItem(II_WEA_WAN_ANGEL, 3600000, 0, 1);
	DropItem(II_WEA_STA_ANGEL, 3600000, 0, 1);
	DropItem(II_WEA_BOW_ANGEL, 3600000, 0, 1);
	DropItem(II_WEA_YOY_ANGEL, 3600000, 0, 1);

	DropItem(II_GEN_JEW_RIN_STRRING, 4166000, 4, 1);
	DropItem(II_GEN_JEW_RIN_INTRING, 4166000, 4, 1);

	DropKind(IK3_SWD, 90, 101);
	DropKind(IK3_AXE, 90, 101);
	DropKind(IK3_CHEERSTICK, 90, 101);
	DropKind(IK3_KNUCKLEHAMMER, 90, 101);
	DropKind(IK3_WAND, 90, 101);
	DropKind(IK3_STAFF, 90, 101);
	DropKind(IK3_HELMET, 90, 101);
	DropKind(IK3_SUIT, 90, 101);
	DropKind(IK3_GAUNTLET, 90, 101);
	DropKind(IK3_BOOTS, 90, 101);
	DropKind(IK3_SHIELD, 90, 101);
	DropKind(IK3_BOW, 90, 101);
	DropKind(IK3_YOYO, 90, 101);
	DropKind(IK3_THSWD, 90, 101);
	DropKind(IK3_THAXE, 90, 101);

	DropItem(II_GEN_MAT_ELE_CYCLON, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_CYCLON, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropItem(II_GEN_GEM_GEM_ERONSIMINT, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_ERONSIMINT, 1000000000, 0, 1);

	DropItem(II_GEN_POT_DRI_VITAL800,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_EIGHTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);

	
	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                        Berserk 30 1.6
			summon 10 1 MI_GONGURY3
			recovery 20 30 100 a           
                    }
		#move
		    {
			loot d 3
		    }	
   	}               

}

MI_SHUHAMMA1
{
	Maxitem = 2;
	DropGold(92, 134);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	

	DropItem(II_GEN_GEM_GEM_HAMMAMER, 300000000, 0, 1);

	

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 60 
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_SHUHAMMA2
{
	Maxitem = 2;
	DropGold(94, 136);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	

	DropItem(II_GEN_GEM_GEM_HAMMAMER, 200000000, 0, 1);

	
	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack  
                        keeprangeattack 5            
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_SHUHAMMA3
{
	Maxitem = 2;
	DropGold(96, 139);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);


	DropItem(II_GEN_GEM_GEM_HAMMAMER, 200000000, 0, 1);

	

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low
                        Rangeattack 6            
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_SHUHAMMA4
{
	Maxitem = 5;
	DropGold(694, 1006);

	DropItem(II_WEA_SWO_ANGEL, 4050000, 0, 1);
	DropItem(II_WEA_SWT_ANGEL, 4050000, 0, 1);
	DropItem(II_WEA_AXE_ANGEL, 4050000, 0, 1);
	DropItem(II_WEA_AXT_ANGEL, 4050000, 0, 1);
	DropItem(II_WEA_KNU_ANGEL, 4050000, 0, 1);
	DropItem(II_WEA_CHE_ANGEL, 4050000, 0, 1);
	DropItem(II_WEA_WAN_ANGEL, 4050000, 0, 1);
	DropItem(II_WEA_STA_ANGEL, 4050000, 0, 1);
	DropItem(II_WEA_BOW_ANGEL, 4050000, 0, 1);
	DropItem(II_WEA_YOY_ANGEL, 4050000, 0, 1);

	DropItem(II_GEN_JEW_RIN_STRRING, 4166000, 4, 1);
	DropItem(II_GEN_JEW_RIN_INTRING, 4166000, 4, 1);

	DropKind(IK3_SWD, 80, 101);
	DropKind(IK3_AXE, 80, 101);
	DropKind(IK3_CHEERSTICK, 80, 101);
	DropKind(IK3_KNUCKLEHAMMER, 80, 101);
	DropKind(IK3_WAND, 80, 101);
	DropKind(IK3_STAFF, 80, 101);
	DropKind(IK3_HELMET, 80, 101);
	DropKind(IK3_SUIT, 80, 101);
	DropKind(IK3_GAUNTLET, 80, 101);
	DropKind(IK3_BOOTS, 80, 101);
	DropKind(IK3_SHIELD, 80, 101);
	DropKind(IK3_BOW, 80, 101);
	DropKind(IK3_YOYO, 80, 101);
	DropKind(IK3_THSWD, 80, 101);
	DropKind(IK3_THAXE, 80, 101);

	DropItem(II_GEN_MAT_ELE_CYCLON, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_CYCLON, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropItem(II_GEN_GEM_GEM_HAMMAMER, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_HAMMAMER, 1000000000, 0, 1);

	DropItem(II_GEN_POT_DRI_VITAL800,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_EIGHTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);

	

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                        Berserk 30 1.6
			summon 10 1 MI_SHUHAMMA3             
                    }
		#move
		    {
			loot d 4
		    }	
   	}               

}

MI_KERN1
{
	Maxitem = 2;
	DropGold(97, 141);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);


	DropItem(II_GEN_GEM_GEM_RNAMOND, 300000000, 0, 1);

	

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			 
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_KERN2
{
	Maxitem = 2;
	DropGold(99, 143);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);


	DropItem(II_GEN_GEM_GEM_RNAMOND, 200000000, 0, 1);

	
	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack  
                                    
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_KERN3
{
	Maxitem = 2;
	DropGold(99, 143);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);


	DropItem(II_GEN_GEM_GEM_RNAMOND, 200000000, 0, 1);

	

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low
                        recovery 20 10 100 a            
                    }
		#move
		    {
			loot d 9
		    }	
   	}               
}

MI_KERN4
{
	Maxitem = 5;
	DropGold(694, 1006);

	DropItem(II_WEA_SWO_ANGEL, 4500000, 0, 1);
	DropItem(II_WEA_SWT_ANGEL, 4500000, 0, 1);
	DropItem(II_WEA_AXE_ANGEL, 4500000, 0, 1);
	DropItem(II_WEA_AXT_ANGEL, 4500000, 0, 1);
	DropItem(II_WEA_KNU_ANGEL, 4500000, 0, 1);
	DropItem(II_WEA_CHE_ANGEL, 4500000, 0, 1);
	DropItem(II_WEA_WAN_ANGEL, 4500000, 0, 1);
	DropItem(II_WEA_STA_ANGEL, 4500000, 0, 1);
	DropItem(II_WEA_BOW_ANGEL, 4500000, 0, 1);
	DropItem(II_WEA_YOY_ANGEL, 4500000, 0, 1);

	DropItem(II_GEN_JEW_RIN_STRRING, 4166000, 4, 1);
	DropItem(II_GEN_JEW_RIN_INTRING, 4166000, 4, 1);

	DropKind(IK3_SWD, 90, 104);
	DropKind(IK3_AXE, 90, 104);
	DropKind(IK3_CHEERSTICK, 90, 104);
	DropKind(IK3_KNUCKLEHAMMER, 90, 104);
	DropKind(IK3_WAND, 90, 104);
	DropKind(IK3_STAFF, 90, 104);
	DropKind(IK3_HELMET, 90, 104);
	DropKind(IK3_SUIT, 90, 104);
	DropKind(IK3_GAUNTLET, 90, 104);
	DropKind(IK3_BOOTS, 90, 104);
	DropKind(IK3_SHIELD, 90, 104);
	DropKind(IK3_BOW, 90, 104);
	DropKind(IK3_YOYO, 90, 104);
	DropKind(IK3_THSWD, 90, 104);
	DropKind(IK3_THAXE, 90, 104);

	DropItem(II_GEN_MAT_ELE_DESERT, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_DESERT, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropItem(II_GEN_GEM_GEM_RNAMOND, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_RNAMOND, 1000000000, 0, 1);

	DropItem(II_GEN_POT_DRI_VITAL800,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_EIGHTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);

	

	m_nAttackFirstRange = 10;

	
	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                        Recovery 10 50 100 m
			Berserk 30 1.5
			summon 10 1 MI_KERN3            
                    }
		#move
		    {
			loot d 5
		    }	
   	}               

}

MI_GLAPHAN1
{
	Maxitem = 2;
	DropGold(99, 142);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	

	DropItem(II_GEN_GEM_GEM_PHANBUBLE, 300000000, 0, 1);

	

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 60 
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_GLAPHAN2
{
	Maxitem = 2;
	DropGold(99, 143);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);


	DropItem(II_GEN_GEM_GEM_PHANBUBLE, 200000000, 0, 1);

	

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack  
                                    
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_GLAPHAN3
{
	Maxitem = 2;
	DropGold(99, 143);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	

	DropItem(II_GEN_GEM_GEM_PHANBUBLE, 200000000, 0, 1);

	

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low
                                    
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_GLAPHAN4
{
	Maxitem = 5;
	DropGold(694, 1006);

	DropItem(II_WEA_SWO_LEAGENDG, 2700000, 0, 1);
	DropItem(II_WEA_SWT_LEAGENDG, 2700000, 0, 1);
	DropItem(II_WEA_AXE_LEAGENDG, 2700000, 0, 1);
	DropItem(II_WEA_AXT_LEAGENDG, 2700000, 0, 1);
	DropItem(II_WEA_KNU_LEAGENDG, 2700000, 0, 1);
	DropItem(II_WEA_CHE_LEAGENDG, 2700000, 0, 1);
	DropItem(II_WEA_WAN_LEAGENDG, 2700000, 0, 1);
	DropItem(II_WEA_STA_LEAGENDG, 2700000, 0, 1);
	DropItem(II_WEA_BOW_LEAGENDG, 2700000, 0, 1);
	DropItem(II_WEA_YOY_LEAGENDG, 2700000, 0, 1);

	DropItem(II_GEN_JEW_RIN_STRRING, 4166000, 4, 1);
	DropItem(II_GEN_JEW_RIN_INTRING, 4166000, 4, 1);

	DropKind(IK3_SWD, 95, 104);
	DropKind(IK3_AXE, 95, 104);
	DropKind(IK3_CHEERSTICK, 95, 104);
	DropKind(IK3_KNUCKLEHAMMER, 95, 104);
	DropKind(IK3_WAND, 95, 104);
	DropKind(IK3_STAFF, 95, 104);
	DropKind(IK3_HELMET, 95, 104);
	DropKind(IK3_SUIT, 95, 104);
	DropKind(IK3_GAUNTLET, 95, 104);
	DropKind(IK3_BOOTS, 95, 104);
	DropKind(IK3_SHIELD, 95, 104);
	DropKind(IK3_BOW, 95, 104);
	DropKind(IK3_YOYO, 95, 104);
	DropKind(IK3_THSWD, 95, 104);
	DropKind(IK3_THAXE, 95, 104);

	DropItem(II_GEN_MAT_ELE_FLAME, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_FLAME, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropItem(II_GEN_GEM_GEM_PHANBUBLE, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_PHANBUBLE, 1000000000, 0, 1);

	DropItem(II_GEN_POT_DRI_VITAL800,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_EIGHTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);

	

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                        summon 10 1 MI_GLAPHAN3
			Berserk 30 1.8
			recovery 10 40 100 m            
                    }
		#move
		    {
			loot d 5
		    }	
   	}               

}

//�ű� �������� ����
MI_KIMERADON1	//Ű�޶�
{
	Maxitem = 2;
	DropGold(88, 128);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_GEM_GEM_HOOKKIMERA, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
			berserk 15 2                                 
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_KIMERADON2
{
	Maxitem = 2;
	DropGold(88, 128);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_GEM_GEM_HOOKKIMERA, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
			berserk 15 2                                 
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_KIMERADON3
{
	Maxitem = 2;
	DropGold(90, 131);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_GEM_GEM_HOOKKIMERA, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			berserk 15 2.5                                 
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_KIMERADON4
{
	Maxitem = 2;
	DropGold(92, 133);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_GEM_GEM_HOOKKIMERA, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			berserk 15 3                                  
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_KIMERADON5
{
	Maxitem = 5;
	DropGold(672, 974);

	DropItem(II_WEA_SWO_ANGEL, 3600000, 0, 1);
	DropItem(II_WEA_SWT_ANGEL, 3600000, 0, 1);
	DropItem(II_WEA_AXE_ANGEL, 3600000, 0, 1);
	DropItem(II_WEA_AXT_ANGEL, 3600000, 0, 1);
	DropItem(II_WEA_KNU_ANGEL, 3600000, 0, 1);
	DropItem(II_WEA_CHE_ANGEL, 3600000, 0, 1);
	DropItem(II_WEA_WAN_ANGEL, 3600000, 0, 1);
	DropItem(II_WEA_STA_ANGEL, 3600000, 0, 1);
	DropItem(II_WEA_BOW_ANGEL, 3600000, 0, 1);
	DropItem(II_WEA_YOY_ANGEL, 3600000, 0, 1);

	DropItem(II_GEN_JEW_RIN_STRRING, 4166000, 4, 1);
	DropItem(II_GEN_JEW_RIN_INTRING, 4166000, 4, 1);

	DropKind(IK3_SWD, 90, 101);
	DropKind(IK3_AXE, 90, 101);
	DropKind(IK3_CHEERSTICK, 90, 101);
	DropKind(IK3_KNUCKLEHAMMER, 90, 101);
	DropKind(IK3_WAND, 90, 101);
	DropKind(IK3_STAFF, 90, 101);
	DropKind(IK3_HELMET, 90, 101);
	DropKind(IK3_SUIT, 90, 101);
	DropKind(IK3_GAUNTLET, 90, 101);
	DropKind(IK3_BOOTS, 90, 101);
	DropKind(IK3_SHIELD, 90, 101);
	DropKind(IK3_BOW, 90, 101);
	DropKind(IK3_YOYO, 90, 101);
	DropKind(IK3_THSWD, 90, 101);
	DropKind(IK3_THAXE, 90, 101);

	DropItem(II_GEN_MAT_ELE_CYCLON, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_CYCLON, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropItem(II_GEN_GEM_GEM_HOOKKIMERA, 100000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_HOOKKIMERA, 100000000, 0, 1);

	DropItem(II_GEN_POT_DRI_VITAL800,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_EIGHTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack  
			berserk 15 3.5                               
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_BEARNUCKY1	// �����Ű
{
	Maxitem = 2;
	DropGold(92, 134);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_GEM_GEM_BEARMANE, 300000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
			berserk 15 2                                
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_BEARNUCKY2
{
	Maxitem = 2;
	DropGold(92, 134);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_GEM_GEM_BEARMANE, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack    
			berserk 15 2                             
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_BEARNUCKY3
{
	Maxitem = 2;
	DropGold(94, 136);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_GEM_GEM_BEARMANE, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack   
			berserk 15 2.5                              
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_BEARNUCKY4
{
	Maxitem = 2;
	DropGold(96, 139);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_GEM_GEM_BEARMANE, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			berserk 15 3                                 
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_BEARNUCKY5
{
	Maxitem = 5;
	DropGold(694, 1006);

	DropItem(II_WEA_SWO_ANGEL, 4050000, 0, 1);
	DropItem(II_WEA_SWT_ANGEL, 4050000, 0, 1);
	DropItem(II_WEA_AXE_ANGEL, 4050000, 0, 1);
	DropItem(II_WEA_AXT_ANGEL, 4050000, 0, 1);
	DropItem(II_WEA_KNU_ANGEL, 4050000, 0, 1);
	DropItem(II_WEA_CHE_ANGEL, 4050000, 0, 1);
	DropItem(II_WEA_WAN_ANGEL, 4050000, 0, 1);
	DropItem(II_WEA_STA_ANGEL, 4050000, 0, 1);
	DropItem(II_WEA_BOW_ANGEL, 4050000, 0, 1);
	DropItem(II_WEA_YOY_ANGEL, 4050000, 0, 1);

	DropItem(II_GEN_JEW_RIN_STRRING, 4166000, 4, 1);
	DropItem(II_GEN_JEW_RIN_INTRING, 4166000, 4, 1);

	DropKind(IK3_SWD, 80, 101);
	DropKind(IK3_AXE, 80, 101);
	DropKind(IK3_CHEERSTICK, 80, 101);
	DropKind(IK3_KNUCKLEHAMMER, 80, 101);
	DropKind(IK3_WAND, 80, 101);
	DropKind(IK3_STAFF, 80, 101);
	DropKind(IK3_HELMET, 80, 101);
	DropKind(IK3_SUIT, 80, 101);
	DropKind(IK3_GAUNTLET, 80, 101);
	DropKind(IK3_BOOTS, 80, 101);
	DropKind(IK3_SHIELD, 80, 101);
	DropKind(IK3_BOW, 80, 101);
	DropKind(IK3_YOYO, 80, 101);
	DropKind(IK3_THSWD, 80, 101);
	DropKind(IK3_THAXE, 80, 101);

	DropItem(II_GEN_MAT_ELE_CYCLON, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_CYCLON, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropItem(II_GEN_GEM_GEM_BEARMANE, 100000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_BEARMANE, 100000000, 0, 1);

	DropItem(II_GEN_POT_DRI_VITAL800,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_EIGHTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
			berserk 15 3.5                                
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_MUFFRIN1	//��Ǫ��
{
	Maxitem = 2;
	DropGold(97, 141);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_GEM_GEM_CRUETMUF, 300000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack   
			berserk 15 2                               
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_MUFFRIN2
{
	Maxitem = 2;
	DropGold(97, 141);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_GEM_GEM_CRUETMUF, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack   
			berserk 15 2                            
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_MUFFRIN3
{
	Maxitem = 2;
	DropGold(99, 143);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_GEM_GEM_CRUETMUF, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			berserk 15 2.5                                 
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_MUFFRIN4
{
	Maxitem = 2;
	DropGold(99, 143);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_GEM_GEM_CRUETMUF, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
			berserk 15 3                                
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_MUFFRIN6
{
	Maxitem = 5;
	DropGold(694, 1006);

	DropItem(II_WEA_SWO_ANGEL, 4500000, 0, 1);
	DropItem(II_WEA_SWT_ANGEL, 4500000, 0, 1);
	DropItem(II_WEA_AXE_ANGEL, 4500000, 0, 1);
	DropItem(II_WEA_AXT_ANGEL, 4500000, 0, 1);
	DropItem(II_WEA_KNU_ANGEL, 4500000, 0, 1);
	DropItem(II_WEA_CHE_ANGEL, 4500000, 0, 1);
	DropItem(II_WEA_WAN_ANGEL, 4500000, 0, 1);
	DropItem(II_WEA_STA_ANGEL, 4500000, 0, 1);
	DropItem(II_WEA_BOW_ANGEL, 4500000, 0, 1);
	DropItem(II_WEA_YOY_ANGEL, 4500000, 0, 1);

	DropItem(II_GEN_JEW_RIN_STRRING, 4166000, 4, 1);
	DropItem(II_GEN_JEW_RIN_INTRING, 4166000, 4, 1);

	DropKind(IK3_SWD, 90, 104);
	DropKind(IK3_AXE, 90, 104);
	DropKind(IK3_CHEERSTICK, 90, 104);
	DropKind(IK3_KNUCKLEHAMMER, 90, 104);
	DropKind(IK3_WAND, 90, 104);
	DropKind(IK3_STAFF, 90, 104);
	DropKind(IK3_HELMET, 90, 104);
	DropKind(IK3_SUIT, 90, 104);
	DropKind(IK3_GAUNTLET, 90, 104);
	DropKind(IK3_BOOTS, 90, 104);
	DropKind(IK3_SHIELD, 90, 104);
	DropKind(IK3_BOW, 90, 104);
	DropKind(IK3_YOYO, 90, 104);
	DropKind(IK3_THSWD, 90, 104);
	DropKind(IK3_THAXE, 90, 104);

	DropItem(II_GEN_MAT_ELE_DESERT, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_DESERT, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropItem(II_GEN_GEM_GEM_CRUETMUF, 100000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_CRUETMUF, 100000000, 0, 1);

	DropItem(II_GEN_POT_DRI_VITAL800,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_EIGHTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
			berserk 15 3.5                                 
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_POPCRANK1
{
	Maxitem = 2;
	DropGold(99, 142);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_GEM_GEM_SHIFTPOP, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack  
			berserk 15 2                                
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_POPCRANK2
{
	Maxitem = 2;
	DropGold(99, 142);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_GEM_GEM_SHIFTPOP, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack   
			berserk 15 2                               
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_POPCRANK3
{
	Maxitem = 2;
	DropGold(99, 143);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_GEM_GEM_SHIFTPOP, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			 Attack 
			berserk 15 2.5                                
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_POPCRANK4
{
	Maxitem = 2;
	DropGold(99, 143);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_GEM_GEM_SHIFTPOP, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			berserk 15 3                                  
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_POPCRANK5
{
	Maxitem = 5;
	DropGold(694, 1006);

	DropItem(II_WEA_SWO_LEAGENDG, 2700000, 0, 1);
	DropItem(II_WEA_SWT_LEAGENDG, 2700000, 0, 1);
	DropItem(II_WEA_AXE_LEAGENDG, 2700000, 0, 1);
	DropItem(II_WEA_AXT_LEAGENDG, 2700000, 0, 1);
	DropItem(II_WEA_KNU_LEAGENDG, 2700000, 0, 1);
	DropItem(II_WEA_CHE_LEAGENDG, 2700000, 0, 1);
	DropItem(II_WEA_WAN_LEAGENDG, 2700000, 0, 1);
	DropItem(II_WEA_STA_LEAGENDG, 2700000, 0, 1);
	DropItem(II_WEA_BOW_LEAGENDG, 2700000, 0, 1);
	DropItem(II_WEA_YOY_LEAGENDG, 2700000, 0, 1);

	DropItem(II_GEN_JEW_RIN_STRRING, 4166000, 4, 1);
	DropItem(II_GEN_JEW_RIN_INTRING, 4166000, 4, 1);

	DropKind(IK3_SWD, 95, 104);
	DropKind(IK3_AXE, 95, 104);
	DropKind(IK3_CHEERSTICK, 95, 104);
	DropKind(IK3_KNUCKLEHAMMER, 95, 104);
	DropKind(IK3_WAND, 95, 104);
	DropKind(IK3_STAFF, 95, 104);
	DropKind(IK3_HELMET, 95, 104);
	DropKind(IK3_SUIT, 95, 104);
	DropKind(IK3_GAUNTLET, 95, 104);
	DropKind(IK3_BOOTS, 95, 104);
	DropKind(IK3_SHIELD, 95, 104);
	DropKind(IK3_BOW, 95, 104);
	DropKind(IK3_YOYO, 95, 104);
	DropKind(IK3_THSWD, 95, 104);
	DropKind(IK3_THAXE, 95, 104);

	DropItem(II_GEN_MAT_ELE_FLAME, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_FLAME, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropItem(II_GEN_GEM_GEM_SHIFTPOP, 100000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_SHIFTPOP, 100000000, 0, 1);

	DropItem(II_GEN_POT_DRI_VITAL800,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_EIGHTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack  
			berserk 15 3.5                               
                    }
		#move
		    {
			
		    }	
   	}               
}


//������ ����
MI_DUFEFERN1
{
	Maxitem = 2;
	DropGold(30, 44);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_MAT_ELE_RIVER, 2812500, 0, 1); //�Ӽ� ī��3 0.025%
	DropItem(II_GEN_MAT_ELE_RIVER, 3750000, 0, 1); //�Ӽ� ī��2 0.05%

	DropItem(II_GEN_MAT_ORICHALCUM01, 7500000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 3050000, 0, 1);

	DropItem(II_GEN_GEM_GEM_DUTARINROOT, 300000000, 0, 1);
	

	DropItem(II_SYS_SYS_KEY_COPPER, 200000000, 0, 1);
	
	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 20 cunning sam 
                                   
                    }
		#move
		    {
			
		    }	
   	}               

}
MI_DUFEFERN2
{
	Maxitem = 2;
	DropGold(30, 44);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_MAT_ELE_DESERT, 2812500, 0, 1); //�Ӽ� ī��3 0.025%
	DropItem(II_GEN_MAT_ELE_DESERT, 3750000, 0, 1); //�Ӽ� ī��2 0.05%

	DropItem(II_GEN_MAT_ORICHALCUM01, 7500000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 3050000, 0, 1);

	DropItem(II_GEN_GEM_GEM_DUTARINROOT, 300000000, 0, 1);
	DropItem(II_SYS_SYS_KEY_COPPER, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning sam
                        
                        berserk 20 1.25           
                    }
		#move
		    {
			loot d 5
		    }	
   	}               

}
MI_DUFEFERN3
{
	Maxitem = 5;
	DropGold(224, 324);
	DropItem(II_GEN_JEW_NEC_MPNECKLACE, 4166000, 7, 1);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_MAT_ELE_RIVER, 7500000, 0, 1); //�Ӽ� ī��3 0.25%
	DropItem(II_GEN_MAT_ELE_RIVER, 15000000, 0, 1); //�Ӽ� ī��2 0.5%
	
	DropItem(II_GEN_MAT_ORICHALCUM01, 11262500, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 920000, 0, 1);

	DropItem(II_GEN_GEM_GEM_DUTARINROOT, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_DUTARINROOT, 1000000000, 0, 1);


	DropItem(II_SYS_SYS_KEY_COPPER, 200000000, 0, 1);
	DropItem(II_SYS_SYS_KEY_SILVER, 20000000, 0, 1);

	m_dwAttackMoveDelay = 0;
	m_dwRunawayDelay = 1000;
	SetRunAway( 10, 0, 1 );
	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                          
                                    
                    }
		#move
		    {
			loot d 5
		    }	
   	}            
}
MI_DUNYANGNYANG1
{
	Maxitem = 2;
	DropGold(31, 45);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_MAT_ELE_GENERATOR, 2812500, 0, 1); //�Ӽ� ī��3 0.025%
	DropItem(II_GEN_MAT_ELE_GENERATOR, 3750000, 0, 1); //�Ӽ� ī��2 0.05%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 3050000, 0, 1);

	DropItem(II_GEN_GEM_GEM_DUSTARSTONE, 300000000, 0, 1);
	DropItem(II_SYS_SYS_KEY_COPPER, 200000000, 0, 1);

	m_nAttackFirstRange = 10;
	
	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 30 cunning sam
                                    
                    }
		#move
		    {
			loot d 3
		    }	
   	}               
}
MI_DUNYANGNYANG2
{
	Maxitem = 2;
	DropGold(32, 46);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	
	DropItem(II_GEN_MAT_ELE_FLAME, 2812500, 0, 1); //�Ӽ� ī��3 0.025%
	DropItem(II_GEN_MAT_ELE_FLAME, 3750000, 0, 1); //�Ӽ� ī��2 0.05%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 3050000, 0, 1);

	DropItem(II_GEN_GEM_GEM_DUSTARSTONE, 300000000, 0, 1);
	DropItem(II_SYS_SYS_KEY_COPPER, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning sam
                        
                                    
                    }
		#move
		    {
			
		    }	
   	}              
}
MI_DUNYANGNYANG3
{
	Maxitem = 5;
	DropGold(229, 332);

	DropItem(II_GEN_JEW_NEC_FPNECKLACE, 4166000, 7, 1);
	
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_MAT_ELE_GENERATOR, 7500000, 0, 1); //�Ӽ� ī��3 0.25%
	DropItem(II_GEN_MAT_ELE_GENERATOR, 15000000, 0, 1); //�Ӽ� ī��2 0.5%

	DropItem(II_GEN_MAT_ORICHALCUM01, 11262500, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 920000, 0, 1);

	DropItem(II_GEN_GEM_GEM_DUSTARSTONE, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_DUSTARSTONE, 1000000000, 0, 1);
	DropItem(II_SYS_SYS_KEY_COPPER, 200000000, 0, 1);
	DropItem(II_SYS_SYS_KEY_SILVER, 20000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                          
                        Berserk 20 1.4            
                    }
		#move
		    {
			loot d 3
		    }	
   	}               
}
MI_DUBANG1
{
	Maxitem = 2;
	DropGold(32, 46);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_MAT_ELE_DESERT, 2812500, 0, 1); //�Ӽ� ī��3 0.025%
	DropItem(II_GEN_MAT_ELE_DESERT, 3750000, 0, 1); //�Ӽ� ī��2 0.05%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 3050000, 0, 1);

	DropItem(II_GEN_GEM_GEM_DUGOLDENWING, 300000000, 0, 1);

	DropItem(II_SYS_SYS_KEY_COPPER, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 10  
                        berserk 20 1.2            
                    }
		#move
		    {
			
		    }	
   	}            

}
MI_DUBANG2
{
	Maxitem = 2;
	DropGold(32, 47);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_MAT_ELE_GENERATOR, 2812500, 0, 1); //�Ӽ� ī��3 0.025%
	DropItem(II_GEN_MAT_ELE_GENERATOR, 3750000, 0, 1); //�Ӽ� ī��2 0.05%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 3050000, 0, 1);
	
	DropItem(II_GEN_GEM_GEM_DUGOLDENWING, 300000000, 0, 1);

	DropItem(II_SYS_SYS_KEY_COPPER, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning sam
                        
                        Evade 10            
                    }
		#move
		    {
			
		    }	
   	}   
}
MI_DUBANG3
{
	Maxitem = 5;
	DropGold(240, 349);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_MAT_ELE_DESERT, 7500000, 0, 1); //�Ӽ� ī��3 0.25%
	DropItem(II_GEN_MAT_ELE_DESERT, 15000000, 0, 1); //�Ӽ� ī��2 0.5%

	DropItem(II_GEN_MAT_ORICHALCUM01, 11262500, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 920000, 0, 1);

	DropItem(II_GEN_GEM_GEM_DUGOLDENWING, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_DUGOLDENWING, 1000000000, 0, 1);




	DropItem(II_SYS_SYS_KEY_COPPER, 200000000, 0, 1);
	DropItem(II_SYS_SYS_KEY_SILVER, 20000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                          
                                    
                    }
		#move
		    {
			loot d 4
		    }	
   	}                            

}
MI_WORMVEDUQUE
{
	Maxitem = 5;
	DropGold(240, 349);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_MAT_ELE_FLAME, 7500000, 0, 1); //�Ӽ� ī��3 0.25%
	DropItem(II_GEN_MAT_ELE_FLAME, 15000000, 0, 1); //�Ӽ� ī��2 0.5%
	
	DropItem(II_GEN_MAT_ORICHALCUM01, 11262500, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 920000, 0, 1);

	DropItem(II_GEN_POT_DRI_VITAL300,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_FIFTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_COO_SEAFOODPANCAKE, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_SEAFOODPANCAKE, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_SEAFOODPANCAKE, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_PINEAPPLECONE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_PINEAPPLECONE, 600000001, 0, 1);



	m_nAttackFirstRange = 10;
	
	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low
    		    }
		#move
		    {
			loot d 2
		    }	
   	}               

}
MI_SERUSURIEL
{
	Maxitem = 5;
	DropGold(240, 349);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_MAT_ELE_CYCLON, 7500000, 0, 1); //�Ӽ� ī��3 0.25%
	DropItem(II_GEN_MAT_ELE_CYCLON, 15000000, 0, 1); //�Ӽ� ī��2 0.5%

	DropItem(II_GEN_MAT_ORICHALCUM01, 11262500, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 920000, 0, 1);

	DropItem(II_GEN_POT_DRI_VITAL700,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_SEVENTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_COO_STEAMEDSEAFOOD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_STEAMEDSEAFOOD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_STEAMEDSEAFOOD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_FRUITSHERBET, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_FRUITSHERBET, 600000001, 0, 1);
	
	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low
			recovery 20 70 100 m
			berserk 10 2                
                    }
		#move
		    {
			loot d 2
		    }	
   	}               

}
MI_VICEVEDUQUE
{
	Maxitem = 2;
	DropGold(39, 56);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_MAT_ELE_RIVER, 7500000, 0, 1); //�Ӽ� ī��3 0.25%
	DropItem(II_GEN_MAT_ELE_RIVER, 15000000, 0, 1); //�Ӽ� ī��2 0.5%

	DropItem(II_GEN_MAT_ORICHALCUM01, 11262500, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 920000, 0, 1);

	DropItem(II_GEN_POT_DRI_VITAL400,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_FIFTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_COO_FISHSOUP, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_BANANAJUJUBAR, 600000001, 0, 1);
	DropItem(II_SYS_SYS_KEY_DUGATE1, 800000001, 0, 1);


	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack cunning low
                    }
		#move
		    {
			loot d 2
		    }	
   	}               

}
//����Ʈ ���� ����
MI_GUARDMON1
{

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }

		#battle
		    {
		                        
                    }

		#move
		    {
			
		    }	
   	}   
}

MI_SHURAITURE
{

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }

		#battle
		    {
		         berserk 10 1.5              
                    }

		#move
		    {
			
		    }	
   	}   
}

MI_REN
{

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }

		#battle
		    {
		         summon 30 1 MI_AIBATT3
			 berserk 10 1.5              
                    }

		#move
		    {
			
		    }	
   	}   
}

MI_SISIF
{

	m_nAttackFirstRange = 10;	

	AI
	{
		#Scan
                    {
			scan
                    }

		#battle
		    {
		         berserk 15 1.5            
                    }

		#move
		    {
			
		    }	
   	}   
}

MI_RUBO
{

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }

		#battle
		    {
		         summon 30 1 MI_AIBATT3
			 berserk 10 1.5             
                    }

		#move
		    {
			
		    }	
   	}   
}

MI_CHANER
{

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }

		#battle
		    {
		         berserk 10 1.5              
                    }

		#move
		    {
			
		    }	
   	}   
}

MI_BABARI
{

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }

		#battle
		    {
		         berserk 10 1.5              
                    }

		#move
		    {
			
		    }	
   	}   
}

MI_SEIDO
{

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }

		#battle
		    {
		         berserk 10 1.5              
                    }

		#move
		    {
			
		    }	
   	}   
}

MI_KIDLER
{

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }

		#battle
		    {
		         summon 30 2 MI_LAWOLF1
			 berserk 15 2             
                    }

		#move
		    {
			
		    }	
   	}   
}

MI_SHAKALPION
{

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }

		#battle
		    {
		         berserk 20 2             
                    }

		#move
		    {
			
		    }	
   	}   
}

MI_HOIREN
{

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }

		#battle
		    {
		         summon 30 3 MI_WAGSAAC2
			 berserk 10 1.5             
                    }

		#move
		    {
			
		    }	
   	}   
}

MI_HUNTERX
{

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }

		#battle
		    {
		         summon 30 3 MI_BANG2
			 berserk 10 1.5             
                    }

		#move
		    {
			
		    }	
   	}   
}

MI_KYNSY
{

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }

		#battle
		    {
		         summon 30 3 MI_FEFERN3
			 berserk 15 1.5             
                    }

		#move
		    {
			
		    }	
   	}   
}

//�Ϲ� ����Ʈ ����	
MI_RBANG1
{

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }

		#battle
		    {
		         berserk 20 2             
                    }

		#move
		    {
			
		    }	
   	}   
}

MI_RBANG2
{

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }

		#battle
		    {
		         berserk 25 2             
                    }

		#move
		    {
			
		    }	
   	}   
}

MI_LORDBANG
{

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan quest 112
                    }

		#battle
		    {
		         berserk 10 2             
                    }

		#move
		    {
			
		    }	
   	}   
}

MI_LBHANOYAN
{

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }

		#battle
		    {
		         berserk 10 3            
                    }

		#move
		    {
			
		    }	
   	}   
}

MI_MOMYORN
{

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }

		#battle
		    {
		                     
                    }

		#move
		    {
			
		    }	
   	}
}

MI_CLOCKS
{

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }

		#battle
		    {
		         berserk 10 2.5             
                    }

		#move
		    {
			
		    }	
   	}   
}

//�ó����� ����Ʈ(2��) ����	
MI_VIOLMAGICION
{

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan quest 1019
                    }

		#battle
		    {
		         berserk 15 2             
                    }

		#move
		    {
			
		    }	
   	}   
}

MI_VIOLMAGICION2
{

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan quest 1021
                    }

		#battle
		    {
		         berserk 20 2             
                    }

		#move
		    {
			
		    }	
   	}   
}

MI_VIOLMAGICION3
{

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan quest 1024
                    }

		#battle
		    {
		         berserk 15 3            
                    }

		#move
		    {
			
		    }	
   	}   
}

MI_EMERALDMANTIS
{

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan quest 118
                    }

		#battle
		    {
		         berserk 15 3            
                    }

		#move
		    {
			
		    }	
   	}   
}

//�Ϲ� ����Ʈ(����Mob) ����	
MI_ORGANIGOR
{

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }

		#battle
		    {
		         berserk 25 2             
                    }

		#move
		    {
			
		    }	
   	}   
}	

MI_GANGARD
{

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }

		#battle
		    {
		         berserk 20 2             
                    }

		#move
		    {
			
		    }	
   	}   
}	

MI_HADESEOR
{

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }

		#battle
		    {
		         berserk 15 2             
                    }

		#move
		    {
			
		    }	
   	}   
}

//P.K ���� ��� �� ���� ����
MI_GUARDIAN
{
	
	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan range 10 chao 100
                    }

		#battle
		    {
			attack
			Helper sam 5000 1
			Rangeattack 10              
                    }

		#move
		    {
			
		    }	
   	}   
}
MI_CHAOGUARDIAN
{

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan range 10 chao 101
                    }

		#battle
		    {
		       attack	
		       Helper sam 5000 1 
		       Rangeattack 10                  
                    }

		#move
		    {
			
		    }	
   	}   
}
MI_PK_FEFERN
{
	DropGold(1, 5);


	DropItem(II_SYS_SYS_KEY_PKENTRANCE,  30000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }

		#battle
		    {
		                       
                    }

		#move
		    {
			
		    }	
   	}               

}
MI_PK_WAGSAAC
{

	DropGold(1, 5);


	DropItem(II_SYS_SYS_KEY_PKENTRANCE,  30000000, 0, 1);
	m_nAttackFirstRange = 10;
	AI
	{
		#Scan
                    {
			scan
                    }

		#battle
		    {
		                       
                    }

		#move
		    {
			
		    }	
   	}               

}
MI_PK_MRPUMPKIN
{

	DropGold(1, 5);

	DropItem(II_SYS_SYS_KEY_PKENTRANCE,  30000000, 0, 1);
	m_nAttackFirstRange = 10;
	AI
	{
		#Scan
                    {
			scan
                    }

		#battle
		    {
		                       
                    }

		#move
		    {
			
		    }	
   	}               

}
MI_PK_GIGGLEBOX
{

	DropGold(1, 5);

	DropItem(II_SYS_SYS_KEY_PKENTRANCE,  30000000, 0, 1);
	m_nAttackFirstRange = 10;	
	AI
	{
		#Scan
                    {
			scan
                    }

		#battle
		    {
		                       
                    }

		#move
		    {
			
		    }	
   	}               

}
MI_PK_HOBO
{

	DropGold(1, 5);

	DropItem(II_SYS_SYS_KEY_PKENTRANCE,  30000000, 0, 1);
	m_nAttackFirstRange = 10;
	AI
	{
		#Scan
                    {
			scan
                    }

		#battle
		    {
		                       
                    }

		#move
		    {
			
		    }	
   	}               

}
MI_PK_CARDPUPPET
{

	DropGold(1, 5);

	DropItem(II_SYS_SYS_KEY_PKENTRANCE,  30000000, 0, 1);
	m_nAttackFirstRange = 10;
	AI
	{
		#Scan
                    {
			scan
                    }

		#battle
		    {
		                       
                    }

		#move
		    {
			
		    }	
   	}               

}
MI_PK_BASQUE
{

	DropGold(1, 5);
	
	DropItem(II_SYS_SYS_KEY_PKENTRANCE,  30000000, 0, 1);
	m_nAttackFirstRange = 10;
	AI
	{
		#Scan
                    {
			scan
                    }

		#battle
		    {
		                       
                    }

		#move
		    {
			
		    }	
   	}               

}
MI_PK_LEYENA
{

	DropGold(1, 5);
	
	DropItem(II_SYS_SYS_KEY_PKENTRANCE,  30000000, 0, 1);
	m_nAttackFirstRange = 10;
	AI
	{
		#Scan
                    {
			scan
                    }

		#battle
		    {
		                       
                    }

		#move
		    {
			
		    }	
   	}               

}
MI_PK_STEELKNIGHT
{

	DropGold(1, 5);

	DropItem(II_SYS_SYS_KEY_PKENTRANCE,  30000000, 0, 1);
	m_nAttackFirstRange = 10;
	AI
	{
		#Scan
                    {
			scan
                    }

		#battle
		    {
		                       
                    }

		#move
		    {
			
		    }	
   	}               

}
MI_PK_VOLT
{

	DropGold(1, 5);

	DropItem(II_SYS_SYS_KEY_PKENTRANCE,  30000000, 0, 1);	
	m_nAttackFirstRange = 10;
	AI
	{
		#Scan
                    {
			scan
                    }

		#battle
		    {
		                       
                    }

		#move
		    {
			
		    }	
   	}               

}
MI_PK_GARBAGEPIDER
{

	DropGold(1, 5);

	DropItem(II_SYS_SYS_KEY_PKENTRANCE,  30000000, 0, 1);
	m_nAttackFirstRange = 10;	
	AI
	{
		#Scan
                    {
			scan
                    }

		#battle
		    {
		                       
                    }

		#move
		    {
			
		    }	
   	}               

}
MI_PK_GREEMONG
{

	DropGold(1, 5);

	DropItem(II_SYS_SYS_KEY_PKENTRANCE,  30000000, 0, 1);
	m_nAttackFirstRange = 10;
	AI
	{
		#Scan
                    {
			scan
                    }

		#battle
		    {
		                       
                    }

		#move
		    {
			
		    }	
   	}               

}
MI_PK_HOPPRE
{

	DropGold(1, 5);

	DropItem(II_SYS_SYS_KEY_PKENTRANCE,  30000000, 0, 1);
	m_nAttackFirstRange = 10;
	AI
	{
		#Scan
                    {
			scan
                    }

		#battle
		    {
		                       
                    }

		#move
		    {
			
		    }	
   	}               

}
MI_PK_IREN
{

	DropGold(1, 5);

	DropItem(II_SYS_SYS_KEY_PKENTRANCE,  30000000, 0, 1);
	m_nAttackFirstRange = 10;
	AI
	{
		#Scan
                    {
			scan
                    }

		#battle
		    {
		                       
                    }

		#move
		    {
			
		    }	
   	}               

}
MI_PK_WATANGKA
{

	DropGold(1, 5);

	DropItem(II_SYS_SYS_KEY_PKENTRANCE,  30000000, 0, 1);
	m_nAttackFirstRange = 10;
	AI
	{
		#Scan
                    {
			scan
                    }

		#battle
		    {
		                       
                    }

		#move
		    {
			
		    }	
   	}               

}
MI_PK_LUIA
{

	DropGold(1, 5);

	DropItem(II_SYS_SYS_KEY_PKENTRANCE,  30000000, 0, 1);
	m_nAttackFirstRange = 10;
	AI
	{
		#Scan
                    {
			scan
                    }

		#battle
		    {
		                       
                    }

		#move
		    {
			
		    }	
   	}               

}
MI_PK_SHUHAMMA
{

	DropGold(1, 5);

	DropItem(II_SYS_SYS_KEY_PKENTRANCE,  30000000, 0, 1);
	m_nAttackFirstRange = 10;
	AI
	{
		#Scan
                    {
			scan
                    }

		#battle
		    {
		                       
                    }

		#move
		    {
			
		    }	
   	}               

}
MI_PK_GLAPHAN
{

	DropGold(1, 5);

	DropItem(II_SYS_SYS_KEY_PKENTRANCE,  30000000, 0, 1);
	m_nAttackFirstRange = 10;
	AI
	{
		#Scan
                    {
			scan
                    }

		#battle
		    {
		                       
                    }

		#move
		    {
			
		    }	
   	}               

}

MI_HAMMERKICK
{
	m_nAttackFirstRange = 10;
	AI
	{
		#Scan
                    {
			scan
                    }

		#battle
		    {
		                       
                    }

		#move
		    {
			
		    }	
   	}               
}

MI_ANTTURTLE
{
	m_nAttackFirstRange = 10;
	AI
	{
		#Scan
                    {
			scan
                    }

		#battle
		    {
		                       
                    }

		#move
		    {
			
		    }	
   	}               
}

//��ī�׽� �������� ����
MI_DU_DKKEAKOON1
{

	Maxitem = 2;
	DropGold(160, 206);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	
	DropItem(II_GEN_MAT_ELE_FLAME, 2812500, 0, 1); //�Ӽ� ī��3 0.025%
	DropItem(II_GEN_MAT_ELE_FLAME, 3750000, 0, 1); //�Ӽ� ī��2 0.05%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 3050000, 0, 1);

	//DropItem(II_GEN_GEM_GEM_TANGKASK, 200000000, 0, 1);


	m_nAttackFirstRange = 10;

	AI
	{ 
		#Scan
                    {
		
                    }

		#battle
		    {
			evade 5               
                    }

		#move
		    {
			
		    }	
   	}               

}
MI_DU_DKKEAKOON2
{

	Maxitem = 2;
	DropGold(160, 206);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_MAT_ELE_FLAME, 2812500, 0, 1); //�Ӽ� ī��3 0.025%
	DropItem(II_GEN_MAT_ELE_FLAME, 3750000, 0, 1); //�Ӽ� ī��2 0.05%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 3250000, 0, 1);

	//DropItem(II_GEN_GEM_GEM_TANGKASK, 200000000, 0, 1);


	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan range 5 quest 68
                    }

		#battle
		    {
			                 
                    }

		#move
		    {
			
		    }	
   	}               

}
MI_DU_DKKEAKOON3
{
	Maxitem = 5;
	DropGold(1500, 1852);

	DropItem(II_GEN_JEW_RIN_STRRING, 4166000, 4, 1);
	DropItem(II_GEN_JEW_RIN_INTRING, 4166000, 4, 1);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_MAT_ELE_FLAME, 7500000, 0, 1); //�Ӽ� ī��3 0.25%
	DropItem(II_GEN_MAT_ELE_FLAME, 15000000, 0, 1); //�Ӽ� ī��2 0.5%

	DropItem(II_GEN_MAT_ORICHALCUM01, 11262500, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 920000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
	
                    }

		#battle
		    {
			evade 1                
                    }

		#move
		    {
			
		    }	
   	}               

}
MI_DU_DKKEAKOON4
{
	Maxitem = 5;
	DropGold(1500, 1852);

	DropItem(II_GEN_JEW_RIN_STRRING, 4166000, 4, 1);
	DropItem(II_GEN_JEW_RIN_INTRING, 4166000, 4, 1);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_MAT_ELE_FLAME, 7500000, 0, 1); //�Ӽ� ī��3 0.25%
	DropItem(II_GEN_MAT_ELE_FLAME, 15000000, 0, 1); //�Ӽ� ī��2 0.5%

	DropItem(II_GEN_MAT_ORICHALCUM01, 11262500, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 920000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan range 5 quest 68
                    }

		#battle
		    {    
			berserk 10 1.5           
                    }

		#move
		    {
			
		    }	
   	}               

}
MI_DU_DKKEAKOON5
{

	Maxitem = 2;
	DropGold(160, 206);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);



	DropItem(II_GEN_MAT_ELE_DESERT, 2812500, 0, 1); //�Ӽ� ī��3 0.025%
	DropItem(II_GEN_MAT_ELE_DESERT, 3750000, 0, 1); //�Ӽ� ī��2 0.05%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 3050000, 0, 1);

	//DropItem(II_GEN_GEM_GEM_TANGKASK, 200000000, 0, 1);


	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {

                    }

		#battle
		    {
			evade 1                  
                    }

		#move
		    {
			
		    }	
   	}               

}
MI_DU_DKKEAKOON6
{

	Maxitem = 2;
	DropGold(160, 206);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_MAT_ELE_DESERT, 2812500, 0, 1); //�Ӽ� ī��3 0.025%
	DropItem(II_GEN_MAT_ELE_DESERT, 3750000, 0, 1); //�Ӽ� ī��2 0.05%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 3050000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan range 5 quest 70
                    }

		#battle
		    {
		                       
                    }

		#move
		    {
			
		    }	
   	}               

}
MI_DU_DKKEAKOON7
{
	Maxitem = 5;
	DropGold(1500, 1852);

	DropItem(II_GEN_JEW_RIN_STRRING, 4166000, 4, 1);
	DropItem(II_GEN_JEW_RIN_INTRING, 4166000, 4, 1);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_MAT_ELE_DESERT, 7500000, 0, 1); //�Ӽ� ī��3 0.25%
	DropItem(II_GEN_MAT_ELE_DESERT, 15000000, 0, 1); //�Ӽ� ī��2 0.5%

	DropItem(II_GEN_MAT_ORICHALCUM01, 11262500, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 920000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan range 5 quest 70
                    }

		#battle
		    {
			evade 1             
                    }

		#move
		    {
			
		    }	
   	}               

}
MI_DU_DKKEAKOON8
{
	Maxitem = 5;
	DropGold(1500, 1852);

	DropItem(II_GEN_JEW_RIN_STRRING, 4166000, 4, 1);
	DropItem(II_GEN_JEW_RIN_INTRING, 4166000, 4, 1);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_MAT_ELE_RIVER, 7500000, 0, 1); //�Ӽ� ī��3 0.25%
	DropItem(II_GEN_MAT_ELE_RIVER, 15000000, 0, 1); //�Ӽ� ī��2 0.5%

	DropItem(II_GEN_MAT_ORICHALCUM01, 11262500, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 920000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan range 5 quest 70
                    }

		#battle
		    {    
			berserk 10 1.5
			recovery 20 50 100 m               
                    }

		#move
		    {
			
		    }	
   	}               

}
MI_DU_DKKEAKOON9
{

	Maxitem = 2;
	DropGold(80, 116);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_MAT_ELE_GENERATOR, 2812500, 0, 1); //�Ӽ� ī��3 0.025%
	DropItem(II_GEN_MAT_ELE_GENERATOR, 3750000, 0, 1); //�Ӽ� ī��2 0.05%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 3050000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }

		#battle
		    { 
			berserk 10 1.5
                    }

		#move
		    {
			
		    }	
   	}               

}
MI_DU_DKKEAKOON10
{

	Maxitem = 2;
	DropGold(80, 116);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_MAT_ELE_CYCLON, 2812500, 0, 1); //�Ӽ� ī��3 0.025%
	DropItem(II_GEN_MAT_ELE_CYCLON, 3750000, 0, 1); //�Ӽ� ī��2 0.05%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 3050000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }

		#battle
		    {
			berserk 10 1.5
                    }

		#move
		    {
			
		    }	
   	}               

}
MI_DU_DKKEAKOON11
{

	Maxitem = 5;
	DropGold(1500, 1852);

	DropItem(II_GEN_JEW_RIN_STRRING, 4166000, 4, 1);
	DropItem(II_GEN_JEW_RIN_INTRING, 4166000, 4, 1);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_MAT_ELE_GENERATOR, 7500000, 0, 1); //�Ӽ� ī��3 0.25%
	DropItem(II_GEN_MAT_ELE_GENERATOR, 15000000, 0, 1); //�Ӽ� ī��2 0.5%

	DropItem(II_GEN_MAT_ORICHALCUM01, 11262500, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 920000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }

		#battle
		    {  
			berserk 10 1.5           
                    }

		#move
		    {
			
		    }	
   	}               

}
MI_DU_DKKEAKOON12
{

	Maxitem = 7;
	DropGold(1500, 1852);

	DropItem(II_GEN_JEW_RIN_STRRING, 10000000, 4, 1);
	DropItem(II_GEN_JEW_RIN_INTRING, 10000000, 4, 1);

	DropItem(II_GEN_MAT_ORICHALCUM01, 45150000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 12480000, 0, 1);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }

		#battle
		    {  
			 berserk 10 1.8
		         recovery 20 70 100 a             
                    }

		#move
		    {
			
		    }	
   	}               

}
MI_DU_DKROACHFL1
{

	Maxitem = 2;
	DropGold(160, 206);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_MAT_ELE_FLAME, 2812500, 0, 1); //�Ӽ� ī��3 0.025%
	DropItem(II_GEN_MAT_ELE_FLAME, 3750000, 0, 1); //�Ӽ� ī��2 0.05%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 3050000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }

		#battle
		    {
		                       
                    }

		#move
		    {
			
		    }	
   	}               

}
MI_DU_DKROACHFL2
{

	Maxitem = 2;
	DropGold(160, 206);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_MAT_ELE_CYCLON, 2812500, 0, 1); //�Ӽ� ī��3 0.025%
	DropItem(II_GEN_MAT_ELE_CYCLON, 3750000, 0, 1); //�Ӽ� ī��2 0.05%

	DropItem(II_GEN_MAT_MOONSTONE, 3050000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }

		#battle
		    {
		                       
                    }

		#move
		    {
			
		    }	
   	}               

}
MI_DU_DKROACHFL3
{
	Maxitem = 5;
	DropGold(1500, 1852);

	DropItem(II_GEN_JEW_RIN_STRRING, 4166000, 4, 1);
	DropItem(II_GEN_JEW_RIN_INTRING, 4166000, 4, 1);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_MAT_ELE_FLAME, 7500000, 0, 1); //�Ӽ� ī��3 0.25%
	DropItem(II_GEN_MAT_ELE_FLAME, 15000000, 0, 1); //�Ӽ� ī��2 0.5%

	DropItem(II_GEN_MAT_ORICHALCUM01, 11262500, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 920000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }

		#battle
		    {
		        berserk 10 1.5              
                    }

		#move
		    {
			
		    }	
   	}               

}
MI_DU_DKROACHFL4
{
	Maxitem = 5;
	DropGold(1500, 1852);

	DropItem(II_GEN_JEW_RIN_STRRING, 4166000, 4, 1);
	DropItem(II_GEN_JEW_RIN_INTRING, 4166000, 4, 1);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_MAT_ELE_CYCLON, 7500000, 0, 1); //�Ӽ� ī��3 0.25%
	DropItem(II_GEN_MAT_ELE_CYCLON, 15000000, 0, 1); //�Ӽ� ī��2 0.5%

	DropItem(II_GEN_MAT_ORICHALCUM01, 11262500, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 920000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }

		#battle
		    {
		        berserk 10 1.5           
                    }

		#move
		    {
			
		    }	
   	}               

}
MI_DU_DKROACHFL5
{

	Maxitem = 2;
	DropGold(160, 206);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	
	DropItem(II_GEN_MAT_ORICHALCUM01, 2250000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1200000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }

		#battle
		    {
		       
		       evade 5   		              
                    }

		#move
		    {
			
		    }	
   	}               

}
MI_DU_DKROACHFL6
{

	Maxitem = 2;
	DropGold(160, 206);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_MAT_ORICHALCUM01, 2250000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1200000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }

		#battle
		    {
		       evade 5               
                    }

		#move
		    {
			
		    }	
   	}               

}
MI_DU_DKTRILLIPY1
{

	Maxitem = 2;
	DropGold(160, 206);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_MAT_ELE_DESERT, 2812500, 0, 1); //�Ӽ� ī��3 0.025%
	DropItem(II_GEN_MAT_ELE_DESERT, 3750000, 0, 1); //�Ӽ� ī��2 0.05%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 3050000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }

		#battle
		    {
		        berserk 15 1.2     
                    }

		#move
		    {
			
		    }	
   	}               

}
MI_DU_DKTRILLIPY2
{

	Maxitem = 5;
	DropGold(1500, 1852);

	DropItem(II_GEN_JEW_RIN_STRRING, 4166000, 4, 1);
	DropItem(II_GEN_JEW_RIN_INTRING, 4166000, 4, 1);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_MAT_ELE_DESERT, 7500000, 0, 1); //�Ӽ� ī��3 0.25%
	DropItem(II_GEN_MAT_ELE_DESERT, 15000000, 0, 1); //�Ӽ� ī��2 0.5%

	DropItem(II_GEN_MAT_ORICHALCUM01, 11262500, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 920000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }

		#battle
		    {     
			berserk 20 1.5
			recovery 20 50 100 m                
                    }

		#move
		    {
			
		    }	
   	}               

}
MI_DU_DKTRILLIPY3
{

	Maxitem = 2;
	DropGold(160, 206);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	
	DropItem(II_GEN_MAT_ELE_CYCLON, 2812500, 0, 1); //�Ӽ� ī��3 0.025%
	DropItem(II_GEN_MAT_ELE_CYCLON, 3750000, 0, 1); //�Ӽ� ī��2 0.05%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 3050000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }

		#battle
		    {
		     	berserk 15 1.2             
                    }

		#move
		    {
			
		    }	
   	}               

}
MI_DU_DKTRILLIPY4
{

	Maxitem = 5;
	DropGold(1500, 1852);

	DropItem(II_GEN_JEW_RIN_STRRING, 4166000, 4, 1);
	DropItem(II_GEN_JEW_RIN_INTRING, 4166000, 4, 1);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_MAT_ELE_CYCLON, 7500000, 0, 1); //�Ӽ� ī��3 0.25%
	DropItem(II_GEN_MAT_ELE_CYCLON, 15000000, 0, 1); //�Ӽ� ī��2 0.5%

	DropItem(II_GEN_MAT_ORICHALCUM01, 11262500, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 920000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }

		#battle
		    {  
			berserk 20 1.5
			recovery 20 50 100 m                 
                    }

		#move
		    {
			
		    }	
   	}               

}
MI_DU_DKTRILLIPY5
{

	Maxitem = 2;
	DropGold(160, 206);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_MAT_ELE_FLAME, 2812500, 0, 1); //�Ӽ� ī��3 0.025%
	DropItem(II_GEN_MAT_ELE_FLAME, 3750000, 0, 1); //�Ӽ� ī��2 0.05%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 3050000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }

		#battle
		    {
		        berserk 15 1.2             
                    }
		#move
		    {
			
		    }	
   	}               
}
MI_DU_DKTRILLIPY6
{

	Maxitem = 5;
	DropGold(1500, 1852);

	DropItem(II_GEN_JEW_RIN_STRRING, 4166000, 4, 1);
	DropItem(II_GEN_JEW_RIN_INTRING, 4166000, 4, 1);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_MAT_ELE_FLAME, 7500000, 0, 1); //�Ӽ� ī��3 0.25%
	DropItem(II_GEN_MAT_ELE_FLAME, 15000000, 0, 1); //�Ӽ� ī��2 0.5%

	DropItem(II_GEN_MAT_ORICHALCUM01, 11262500, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 920000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }

		#battle
		    {  
			berserk 20 1.5
			recovery 20 50 100 m               
                    }

		#move
		    {
			
		    }	
   	}               
}
MI_DU_DKKIMERADON1
{

	Maxitem = 2;
	DropGold(80, 116);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_MAT_ORICHALCUM01, 11262500, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 920000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }

		#battle
		    {
		                       
                    }

		#move
		    {
			
		    }	
   	}               
}
MI_DU_DKKIMERADON2
{

	Maxitem = 5;
	DropGold(588, 852);

	DropItem(II_GEN_JEW_RIN_STRRING, 4166000, 4, 1);
	DropItem(II_GEN_JEW_RIN_INTRING, 4166000, 4, 1);

	DropItem(II_GEN_MAT_ORICHALCUM01, 22575000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 6240000, 0, 1);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);


	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }

		#battle
		    {
		        berserk 30 1.8
			recovery 20 50 100 m               
                    }

		#move
		    {
			
		    }	
   	}               
}
MI_DU_METEONYKER
{
	Maxitem = 3;
        DropGold(500, 2000);

	DropItem(II_WEA_SWO_BLOODY, 300, 0, 1);
	DropItem(II_WEA_SWT_BLOODY, 300, 0, 1);
	DropItem(II_WEA_AXE_BLOODY, 300, 0, 1);
	DropItem(II_WEA_AXT_BLOODY, 300, 0, 1);
	DropItem(II_WEA_KNU_BLOODY, 300, 0, 1);
	DropItem(II_WEA_CHE_BLOODY, 300, 0, 1);
	DropItem(II_WEA_WAN_BLOODY2, 300, 0, 1);
	DropItem(II_WEA_STA_BLOODY, 300, 0, 1);
	DropItem(II_WEA_BOW_BLOODY, 300, 0, 1);
	DropItem(II_WEA_YOY_BLOODY, 300, 0, 1);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_DRAGONHEART, 100000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_DRAGONCANINE, 300000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }

		#battle
		    {
		        berserk 20 2.0
        
                    }

		#move
		    {
			
		    }	
   	}               

}
MI_DU_METEONYKER2
{
	Maxitem = 10;
        DropItem(II_PET_EGG, 600000000, 0, 1);
        DropItem(II_PET_EGG, 600000000, 0, 1);
        DropItem(II_PET_EGG, 600000000, 0, 1);
        DropItem(II_PET_EGG, 600000000, 0, 1);
        DropItem(II_PET_EGG, 600000000, 0, 1);
	DropItem(II_ARM_F_MER_HELMET_SET_04	,  900000, 0, 1);
	DropItem(II_ARM_F_MER_SUIT_SET_04	,  900000, 0, 1);
	DropItem(II_ARM_F_MER_GAUNTLET_SET_04	,  900000, 0, 1);
	DropItem(II_ARM_F_MER_BOOTS_SET_04	,  900000, 0, 1);			
	DropItem(II_ARM_M_MER_HELMET_SET_04	,  900000, 0, 1);		
	DropItem(II_ARM_M_MER_SUIT_SET_04	,  900000, 0, 1);		
	DropItem(II_ARM_M_MER_GAUNTLET_SET_04	,  900000, 0, 1);		
	DropItem(II_ARM_M_MER_BOOTS_SET_04	,  900000, 0, 1);		
	DropItem(II_ARM_F_ACR_HELMET_SET_05	,  900000, 0, 1);		
	DropItem(II_ARM_F_ACR_SUIT_SET_05	,  900000, 0, 1);		
	DropItem(II_ARM_F_ACR_GAUNTLET_SET_05	,  900000, 0, 1);		
	DropItem(II_ARM_F_ACR_BOOTS_SET_05	,  900000, 0, 1);		
	DropItem(II_ARM_M_ACR_HELMET_SET_05	,  900000, 0, 1);		
	DropItem(II_ARM_M_ACR_SUIT_SET_05	,  900000, 0, 1);		
	DropItem(II_ARM_M_ACR_GAUNTLET_SET_05	,  900000, 0, 1);		
	DropItem(II_ARM_M_ACR_BOOTS_SET_05	,  900000, 0, 1);		
	DropItem(II_ARM_F_ASS_HELMET_SET_06	,  900000, 0, 1);		
	DropItem(II_ARM_F_ASS_SUIT_SET_06	,  900000, 0, 1);		
	DropItem(II_ARM_F_ASS_GAUNTLET_SET_06	,  900000, 0, 1);		
	DropItem(II_ARM_F_ASS_BOOTS_SET_06	,  900000, 0, 1);		
	DropItem(II_ARM_M_ASS_HELMET_SET_06	,  900000, 0, 1);		
	DropItem(II_ARM_M_ASS_SUIT_SET_06	,  900000, 0, 1);		
	DropItem(II_ARM_M_ASS_GAUNTLET_SET_06	,  900000, 0, 1);		
	DropItem(II_ARM_M_ASS_BOOTS_SET_06	,  900000, 0, 1);		
	DropItem(II_ARM_F_MAG_HELMET_SET_07	,  900000, 0, 1);		
	DropItem(II_ARM_F_MAG_SUIT_SET_07	,  900000, 0, 1);		
	DropItem(II_ARM_F_MAG_GAUNTLET_SET_07	,  900000, 0, 1);		
	DropItem(II_ARM_F_MAG_BOOTS_SET_07	,  900000, 0, 1);		
	DropItem(II_ARM_M_MAG_HELMET_SET_07	,  900000, 0, 1);		
	DropItem(II_ARM_M_MAG_SUIT_SET_07	,  900000, 0, 1);		
	DropItem(II_ARM_M_MAG_GAUNTLET_SET_07	,  900000, 0, 1);		
	DropItem(II_ARM_M_MAG_BOOTS_SET_07	,  900000, 0, 1);		
	DropItem(II_ARM_F_KIN_HELMET_SET_08	,  900000, 0, 1);	
	DropItem(II_ARM_F_KIN_SUIT_SET_08	,  900000, 0, 1);	
	DropItem(II_ARM_F_KIN_GAUNTLET_SET_08	,  900000, 0, 1);	
	DropItem(II_ARM_F_KIN_BOOTS_SET_08	,  900000, 0, 1);	
	DropItem(II_ARM_M_KIN_HELMET_SET_08	,  900000, 0, 1);	
	DropItem(II_ARM_M_KIN_SUIT_SET_08	,  900000, 0, 1);	
	DropItem(II_ARM_M_KIN_GAUNTLET_SET_08	,  900000, 0, 1);	
	DropItem(II_ARM_M_KIN_BOOTS_SET_08	,  900000, 0, 1);	
	DropItem(II_ARM_F_BLA_HELMET_SET_11	,  900000, 0, 1);	
	DropItem(II_ARM_F_BLA_SUIT_SET_11	,  900000, 0, 1);	
	DropItem(II_ARM_F_BLA_GAUNTLET_SET_11	,  900000, 0, 1);	
	DropItem(II_ARM_F_BLA_BOOTS_SET_11	,  900000, 0, 1);	
	DropItem(II_ARM_M_BLA_HELMET_SET_11	,  900000, 0, 1);	
	DropItem(II_ARM_M_BLA_SUIT_SET_11	,  900000, 0, 1);	
	DropItem(II_ARM_M_BLA_GAUNTLET_SET_11	,  900000, 0, 1);	
	DropItem(II_ARM_M_BLA_BOOTS_SET_11	,  900000, 0, 1);	
	DropItem(II_ARM_F_JST_HELMET_SET_14	,  900000, 0, 1);	
	DropItem(II_ARM_F_JST_SUIT_SET_14	,  900000, 0, 1);	
	DropItem(II_ARM_F_JST_GAUNTLET_SET_14	,  900000, 0, 1);	
	DropItem(II_ARM_F_JST_BOOTS_SET_14	,  900000, 0, 1);	
	DropItem(II_ARM_M_JST_HELMET_SET_14	,  900000, 0, 1);	
	DropItem(II_ARM_M_JST_SUIT_SET_14	,  900000, 0, 1);	
	DropItem(II_ARM_M_JST_GAUNTLET_SET_14	,  900000, 0, 1);	
	DropItem(II_ARM_M_JST_BOOTS_SET_14	,  900000, 0, 1);	
	DropItem(II_ARM_F_RAG_HELMET_SET_17	,  900000, 0, 1);	
	DropItem(II_ARM_F_RAG_SUIT_SET_17	,  900000, 0, 1);	
	DropItem(II_ARM_F_RAG_GAUNTLET_SET_17	,  900000, 0, 1);	
	DropItem(II_ARM_F_RAG_BOOTS_SET_17	,  900000, 0, 1);	
	DropItem(II_ARM_M_RAG_HELMET_SET_17	,  900000, 0, 1);	
	DropItem(II_ARM_M_RAG_SUIT_SET_17	,  900000, 0, 1);	
	DropItem(II_ARM_M_RAG_GAUNTLET_SET_17	,  900000, 0, 1);	
	DropItem(II_ARM_M_RAG_BOOTS_SET_17	,  900000, 0, 1);	
	DropItem(II_ARM_F_RIN_HELMET_SET_20	,  900000, 0, 1);	
	DropItem(II_ARM_F_RIN_SUIT_SET_20	,  900000, 0, 1);	
	DropItem(II_ARM_F_RIN_GAUNTLET_SET_20	,  900000, 0, 1);	
	DropItem(II_ARM_F_RIN_BOOTS_SET_20	,  900000, 0, 1);	
	DropItem(II_ARM_M_RIN_HELMET_SET_20	,  900000, 0, 1);	
	DropItem(II_ARM_M_RIN_SUIT_SET_20	,  900000, 0, 1);	
	DropItem(II_ARM_M_RIN_GAUNTLET_SET_20	,  900000, 0, 1);	
	DropItem(II_ARM_M_RIN_BOOTS_SET_20	,  900000, 0, 1);	
	DropItem(II_ARM_F_BIL_HELMET_SET_23	,  900000, 0, 1);	
	DropItem(II_ARM_F_BIL_SUIT_SET_23	,  900000, 0, 1);	
	DropItem(II_ARM_F_BIL_GAUNTLET_SET_23	,  900000, 0, 1);	
	DropItem(II_ARM_F_BIL_BOOTS_SET_23	,  900000, 0, 1);	
	DropItem(II_ARM_M_BIL_HELMET_SET_23	,  900000, 0, 1);	
	DropItem(II_ARM_M_BIL_SUIT_SET_23	,  900000, 0, 1);	
	DropItem(II_ARM_M_BIL_GAUNTLET_SET_23	,  900000, 0, 1);	
	DropItem(II_ARM_M_BIL_BOOTS_SET_23	,  900000, 0, 1);	
	DropItem(II_ARM_F_PSY_HELMET_SET_26	,  900000, 0, 1);	
	DropItem(II_ARM_F_PSY_SUIT_SET_26	,  900000, 0, 1);	
	DropItem(II_ARM_F_PSY_GAUNTLET_SET_26	,  900000, 0, 1);	
	DropItem(II_ARM_F_PSY_BOOTS_SET_26	,  900000, 0, 1);	
	DropItem(II_ARM_M_PSY_HELMET_SET_26	,  900000, 0, 1);	
	DropItem(II_ARM_M_PSY_SUIT_SET_26	,  900000, 0, 1);	
	DropItem(II_ARM_M_PSY_GAUNTLET_SET_26	,  900000, 0, 1);	
	DropItem(II_ARM_M_PSY_BOOTS_SET_26	,  900000, 0, 1);	
	DropItem(II_ARM_F_ELE_HELMET_SET_29	,  900000, 0, 1);	
	DropItem(II_ARM_F_ELE_SUIT_SET_29	,  900000, 0, 1);	
	DropItem(II_ARM_F_ELE_GAUNTLET_SET_29	,  900000, 0, 1);	
	DropItem(II_ARM_F_ELE_BOOTS_SET_29	,  900000, 0, 1);	
	DropItem(II_ARM_M_ELE_HELMET_SET_29	,  900000, 0, 1);	
	DropItem(II_ARM_M_ELE_SUIT_SET_29	,  900000, 0, 1);	
	DropItem(II_ARM_M_ELE_GAUNTLET_SET_29	,  900000, 0, 1);	
	DropItem(II_ARM_M_ELE_BOOTS_SET_29	,  900000, 0, 1);	
	DropItem(II_ARM_F_KIN_HELMET_SET_09	,  900000, 0, 1);	
	DropItem(II_ARM_F_KIN_SUIT_SET_09	,  900000, 0, 1);	
	DropItem(II_ARM_F_KIN_GAUNTLET_SET_09	,  900000, 0, 1);	
	DropItem(II_ARM_F_KIN_BOOTS_SET_09	,  900000, 0, 1);	
	DropItem(II_ARM_M_KIN_HELMET_SET_09	,  900000, 0, 1);	
	DropItem(II_ARM_M_KIN_SUIT_SET_09	,  900000, 0, 1);	
	DropItem(II_ARM_M_KIN_GAUNTLET_SET_09	,  900000, 0, 1);	
	DropItem(II_ARM_M_KIN_BOOTS_SET_09	,  900000, 0, 1);	
	DropItem(II_ARM_F_BLA_HELMET_SET_12	,  900000, 0, 1);	
	DropItem(II_ARM_F_BLA_SUIT_SET_12	,  900000, 0, 1);	
	DropItem(II_ARM_F_BLA_GAUNTLET_SET_12	,  900000, 0, 1);	
	DropItem(II_ARM_F_BLA_BOOTS_SET_12	,  900000, 0, 1);	
	DropItem(II_ARM_M_BLA_HELMET_SET_12	,  900000, 0, 1);	
	DropItem(II_ARM_M_BLA_SUIT_SET_12	,  900000, 0, 1);	
	DropItem(II_ARM_M_BLA_GAUNTLET_SET_12	,  900000, 0, 1);	
	DropItem(II_ARM_M_BLA_BOOTS_SET_12	,  900000, 0, 1);	
	DropItem(II_ARM_F_JST_HELMET_SET_15	,  900000, 0, 1);	
	DropItem(II_ARM_F_JST_SUIT_SET_15	,  900000, 0, 1);	
	DropItem(II_ARM_F_JST_GAUNTLET_SET_15	,  900000, 0, 1);	
	DropItem(II_ARM_F_JST_BOOTS_SET_15	,  900000, 0, 1);	
	DropItem(II_ARM_M_JST_HELMET_SET_15	,  900000, 0, 1);	
	DropItem(II_ARM_M_JST_SUIT_SET_15	,  900000, 0, 1);	
	DropItem(II_ARM_M_JST_GAUNTLET_SET_15	,  900000, 0, 1);	
	DropItem(II_ARM_M_JST_BOOTS_SET_15	,  900000, 0, 1);	
	DropItem(II_ARM_F_RAG_HELMET_SET_18	,  900000, 0, 1);	
	DropItem(II_ARM_F_RAG_SUIT_SET_18	,  900000, 0, 1);	
	DropItem(II_ARM_F_RAG_GAUNTLET_SET_18	,  900000, 0, 1);	
	DropItem(II_ARM_F_RAG_BOOTS_SET_18	,  900000, 0, 1);	
	DropItem(II_ARM_M_RAG_HELMET_SET_18	,  900000, 0, 1);	
	DropItem(II_ARM_M_RAG_SUIT_SET_18	,  900000, 0, 1);	
	DropItem(II_ARM_M_RAG_GAUNTLET_SET_18	,  900000, 0, 1);	
	DropItem(II_ARM_M_RAG_BOOTS_SET_18	,  900000, 0, 1);	
	DropItem(II_ARM_F_RIN_HELMET_SET_21	,  900000, 0, 1);	
	DropItem(II_ARM_F_RIN_SUIT_SET_21	,  900000, 0, 1);	
	DropItem(II_ARM_F_RIN_GAUNTLET_SET_21	,  900000, 0, 1);	
	DropItem(II_ARM_F_RIN_BOOTS_SET_21	,  900000, 0, 1);	
	DropItem(II_ARM_M_RIN_HELMET_SET_21	,  900000, 0, 1);	
	DropItem(II_ARM_M_RIN_SUIT_SET_21	,  900000, 0, 1);	
	DropItem(II_ARM_M_RIN_GAUNTLET_SET_21	,  900000, 0, 1);	
	DropItem(II_ARM_M_RIN_BOOTS_SET_21	,  900000, 0, 1);	
	DropItem(II_ARM_F_BIL_HELMET_SET_24	,  900000, 0, 1);	
	DropItem(II_ARM_F_BIL_SUIT_SET_24	,  900000, 0, 1);	
	DropItem(II_ARM_F_BIL_GAUNTLET_SET_24	,  900000, 0, 1);	
	DropItem(II_ARM_F_BIL_BOOTS_SET_24	,  900000, 0, 1);	
	DropItem(II_ARM_M_BIL_HELMET_SET_24	,  900000, 0, 1);	
	DropItem(II_ARM_M_BIL_SUIT_SET_24	,  900000, 0, 1);	
	DropItem(II_ARM_M_BIL_GAUNTLET_SET_24	,  900000, 0, 1);	
	DropItem(II_ARM_M_BIL_BOOTS_SET_24	,  900000, 0, 1);	
	DropItem(II_ARM_F_PSY_HELMET_SET_27	,  900000, 0, 1);	
	DropItem(II_ARM_F_PSY_SUIT_SET_27	,  900000, 0, 1);	
	DropItem(II_ARM_F_PSY_GAUNTLET_SET_27	,  900000, 0, 1);	
	DropItem(II_ARM_F_PSY_BOOTS_SET_27	,  900000, 0, 1);	
	DropItem(II_ARM_M_PSY_HELMET_SET_27	,  900000, 0, 1);	
	DropItem(II_ARM_M_PSY_SUIT_SET_27	,  900000, 0, 1);	
	DropItem(II_ARM_M_PSY_GAUNTLET_SET_27	,  900000, 0, 1);	
	DropItem(II_ARM_M_PSY_BOOTS_SET_27	,  900000, 0, 1);	
	DropItem(II_ARM_F_ELE_HELMET_SET_30	,  900000, 0, 1);	
	DropItem(II_ARM_F_ELE_SUIT_SET_30	,  900000, 0, 1);	
	DropItem(II_ARM_F_ELE_GAUNTLET_SET_30	,  900000, 0, 1);	
	DropItem(II_ARM_F_ELE_BOOTS_SET_30	,  900000, 0, 1);	
	DropItem(II_ARM_M_ELE_HELMET_SET_30	,  900000, 0, 1);	
	DropItem(II_ARM_M_ELE_SUIT_SET_30	,  900000, 0, 1);	
	DropItem(II_ARM_M_ELE_GAUNTLET_SET_30	,  900000, 0, 1);	
	DropItem(II_ARM_M_ELE_BOOTS_SET_30	,  900000, 0, 1);	
	DropItem(II_ARM_F_KIN_HELMET_SET_10	,  900000, 0, 1);	
	DropItem(II_ARM_F_KIN_SUIT_SET_10	,  900000, 0, 1);		
	DropItem(II_ARM_F_KIN_GAUNTLET_SET_10	,  900000, 0, 1);		
	DropItem(II_ARM_F_KIN_BOOTS_SET_10	,  900000, 0, 1);		
	DropItem(II_ARM_M_KIN_HELMET_SET_10	,  900000, 0, 1);		
	DropItem(II_ARM_M_KIN_SUIT_SET_10	,  900000, 0, 1);		
	DropItem(II_ARM_M_KIN_GAUNTLET_SET_10	,  900000, 0, 1);		
	DropItem(II_ARM_M_KIN_BOOTS_SET_10	,  900000, 0, 1);		
	DropItem(II_ARM_F_BLA_HELMET_SET_13	,  900000, 0, 1);		
	DropItem(II_ARM_F_BLA_SUIT_SET_13	,  900000, 0, 1);		
	DropItem(II_ARM_F_BLA_GAUNTLET_SET_13	,  900000, 0, 1);		
	DropItem(II_ARM_F_BLA_BOOTS_SET_13	,  900000, 0, 1);		
	DropItem(II_ARM_M_BLA_HELMET_SET_13	,  900000, 0, 1);		
	DropItem(II_ARM_M_BLA_SUIT_SET_13	,  900000, 0, 1);		
	DropItem(II_ARM_M_BLA_GAUNTLET_SET_13	,  900000, 0, 1);		
	DropItem(II_ARM_M_BLA_BOOTS_SET_13	,  900000, 0, 1);		
	DropItem(II_ARM_F_JST_HELMET_SET_16	,  900000, 0, 1);		
	DropItem(II_ARM_F_JST_SUIT_SET_16	,  900000, 0, 1);		
	DropItem(II_ARM_F_JST_GAUNTLET_SET_16	,  900000, 0, 1);		
	DropItem(II_ARM_F_JST_BOOTS_SET_16	,  900000, 0, 1);		
	DropItem(II_ARM_M_JST_HELMET_SET_16	,  900000, 0, 1);		
	DropItem(II_ARM_M_JST_SUIT_SET_16	,  900000, 0, 1);		
	DropItem(II_ARM_M_JST_GAUNTLET_SET_16	,  900000, 0, 1);		
	DropItem(II_ARM_M_JST_BOOTS_SET_16	,  900000, 0, 1);		
	DropItem(II_ARM_F_RAG_HELMET_SET_19	,  900000, 0, 1);		
	DropItem(II_ARM_F_RAG_SUIT_SET_19	,  900000, 0, 1);		
	DropItem(II_ARM_F_RAG_GAUNTLET_SET_19	,  900000, 0, 1);		
	DropItem(II_ARM_F_RAG_BOOTS_SET_19	,  900000, 0, 1);		
	DropItem(II_ARM_M_RAG_HELMET_SET_19	,  900000, 0, 1);		
	DropItem(II_ARM_M_RAG_SUIT_SET_19	,  900000, 0, 1);		
	DropItem(II_ARM_M_RAG_GAUNTLET_SET_19	,  900000, 0, 1);		
	DropItem(II_ARM_M_RAG_BOOTS_SET_19	,  900000, 0, 1);		
	DropItem(II_ARM_F_RIN_HELMET_SET_22	,  900000, 0, 1);		
	DropItem(II_ARM_F_RIN_SUIT_SET_22	,  900000, 0, 1);		
	DropItem(II_ARM_F_RIN_GAUNTLET_SET_22	,  900000, 0, 1);		
	DropItem(II_ARM_F_RIN_BOOTS_SET_22	,  900000, 0, 1);		
	DropItem(II_ARM_M_RIN_HELMET_SET_22	,  900000, 0, 1);		
	DropItem(II_ARM_M_RIN_SUIT_SET_22	,  900000, 0, 1);		
	DropItem(II_ARM_M_RIN_GAUNTLET_SET_22	,  900000, 0, 1);		
	DropItem(II_ARM_M_RIN_BOOTS_SET_22	,  900000, 0, 1);		
	DropItem(II_ARM_F_BIL_HELMET_SET_25	,  900000, 0, 1);		
	DropItem(II_ARM_F_BIL_SUIT_SET_25	,  900000, 0, 1);		
	DropItem(II_ARM_F_BIL_GAUNTLET_SET_25	,  900000, 0, 1);		
	DropItem(II_ARM_F_BIL_BOOTS_SET_25	,  900000, 0, 1);		
	DropItem(II_ARM_M_BIL_HELMET_SET_25	,  900000, 0, 1);		
	DropItem(II_ARM_M_BIL_SUIT_SET_25	,  900000, 0, 1);		
	DropItem(II_ARM_M_BIL_GAUNTLET_SET_25	,  900000, 0, 1);		
	DropItem(II_ARM_M_BIL_BOOTS_SET_25	,  900000, 0, 1);		
	DropItem(II_ARM_F_PSY_HELMET_SET_28	,  900000, 0, 1);		
	DropItem(II_ARM_F_PSY_SUIT_SET_28	,  900000, 0, 1);		
	DropItem(II_ARM_F_PSY_GAUNTLET_SET_28	,  900000, 0, 1);		
	DropItem(II_ARM_F_PSY_BOOTS_SET_28	,  900000, 0, 1);		
	DropItem(II_ARM_M_PSY_HELMET_SET_28	,  900000, 0, 1);		
	DropItem(II_ARM_M_PSY_SUIT_SET_28	,  900000, 0, 1);		
	DropItem(II_ARM_M_PSY_GAUNTLET_SET_28	,  900000, 0, 1);		
	DropItem(II_ARM_M_PSY_BOOTS_SET_28	,  900000, 0, 1);		
	DropItem(II_ARM_F_ELE_HELMET_SET_31	,  900000, 0, 1);		
	DropItem(II_ARM_F_ELE_SUIT_SET_31	,  900000, 0, 1);		
	DropItem(II_ARM_F_ELE_GAUNTLET_SET_31	,  900000, 0, 1);		
	DropItem(II_ARM_F_ELE_BOOTS_SET_31	,  900000, 0, 1);		
	DropItem(II_ARM_M_ELE_HELMET_SET_31	,  900000, 0, 1);		
	DropItem(II_ARM_M_ELE_SUIT_SET_31	,  900000, 0, 1);		
	DropItem(II_ARM_M_ELE_GAUNTLET_SET_31	,  900000, 0, 1);		
	DropItem(II_ARM_M_ELE_BOOTS_SET_31	,  900000, 0, 1);		
	DropItem(II_ARM_F_KIN_HELMET_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_F_KIN_SUIT_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_F_KIN_GAUNTLET_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_F_KIN_BOOTS_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_M_KIN_HELMET_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_M_KIN_SUIT_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_M_KIN_GAUNTLET_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_M_KIN_BOOTS_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_F_BLA_HELMET_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_F_BLA_SUIT_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_F_BLA_GAUNTLET_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_F_BLA_BOOTS_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_M_BLA_HELMET_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_M_BLA_SUIT_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_M_BLA_GAUNTLET_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_M_BLA_BOOTS_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_F_JST_HELMET_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_F_JST_SUIT_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_F_JST_GAUNTLET_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_F_JST_BOOTS_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_M_JST_HELMET_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_M_JST_SUIT_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_M_JST_GAUNTLET_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_M_JST_BOOTS_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_F_RAG_HELMET_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_F_RAG_SUIT_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_F_RAG_GAUNTLET_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_F_RAG_BOOTS_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_M_RAG_HELMET_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_M_RAG_SUIT_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_M_RAG_GAUNTLET_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_M_RAG_BOOTS_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_F_RIN_HELMET_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_F_RIN_SUIT_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_F_RIN_GAUNTLET_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_F_RIN_BOOTS_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_M_RIN_HELMET_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_M_RIN_SUIT_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_M_RIN_GAUNTLET_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_M_RIN_BOOTS_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_F_BIL_HELMET_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_F_BIL_SUIT_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_F_BIL_GAUNTLET_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_F_BIL_BOOTS_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_M_BIL_HELMET_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_M_BIL_SUIT_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_M_BIL_GAUNTLET_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_M_BIL_BOOTS_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_F_PSY_HELMET_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_F_PSY_SUIT_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_F_PSY_GAUNTLET_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_F_PSY_BOOTS_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_M_PSY_HELMET_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_M_PSY_SUIT_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_M_PSY_GAUNTLET_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_M_PSY_BOOTS_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_F_ELE_HELMET_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_F_ELE_SUIT_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_F_ELE_GAUNTLET_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_F_ELE_BOOTS_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_M_ELE_HELMET_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_M_ELE_SUIT_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_M_ELE_GAUNTLET_SET_32	,  900000, 0, 1);		
	DropItem(II_ARM_M_ELE_BOOTS_SET_32	,  900000, 0, 1);		

	DropItem(II_GEN_MAT_DIAMOND, 21000000, 0, 1);
	DropItem(II_GEN_MAT_DIAMOND, 21000000, 0, 1);
	DropItem(II_GEN_MAT_DIAMOND, 21000000, 0, 1);
	DropItem(II_GEN_MAT_DIAMOND, 21000000, 0, 1);
	DropItem(II_GEN_MAT_DIAMOND, 21000000, 0, 1);
	DropItem(II_GEN_MAT_EMERALD, 27000000, 0, 1);
	DropItem(II_GEN_MAT_EMERALD, 27000000, 0, 1);
	DropItem(II_GEN_MAT_EMERALD, 27000000, 0, 1);
	DropItem(II_GEN_MAT_EMERALD, 27000000, 0, 1);
	DropItem(II_GEN_MAT_EMERALD, 27000000, 0, 1);
	DropItem(II_GEN_MAT_SAPPHIRE, 36000000, 0, 1);
	DropItem(II_GEN_MAT_SAPPHIRE, 36000000, 0, 1);
	DropItem(II_GEN_MAT_SAPPHIRE, 36000000, 0, 1);
	DropItem(II_GEN_MAT_SAPPHIRE, 36000000, 0, 1);
	DropItem(II_GEN_MAT_SAPPHIRE, 36000000, 0, 1);
	DropItem(II_GEN_MAT_RUBY, 48000000, 0, 1);
	DropItem(II_GEN_MAT_RUBY, 48000000, 0, 1);
	DropItem(II_GEN_MAT_RUBY, 48000000, 0, 1);
	DropItem(II_GEN_MAT_RUBY, 48000000, 0, 1);
	DropItem(II_GEN_MAT_RUBY, 48000000, 0, 1);
	DropItem(II_GEN_MAT_TOPAZ, 63000000, 0, 1);
	DropItem(II_GEN_MAT_TOPAZ, 63000000, 0, 1);
	DropItem(II_GEN_MAT_TOPAZ, 63000000, 0, 1);
	DropItem(II_GEN_MAT_TOPAZ, 63000000, 0, 1);
	DropItem(II_GEN_MAT_TOPAZ, 63000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 180000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 180000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 180000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 180000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 180000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 180000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 180000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 180000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 180000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 180000000, 0, 1);
	DropItem(II_WEA_SWO_BLOODY, 15000000, 0, 1);
	DropItem(II_WEA_SWT_BLOODY, 15000000, 0, 1);
	DropItem(II_WEA_AXE_BLOODY, 15000000, 0, 1);
	DropItem(II_WEA_AXT_BLOODY, 15000000, 0, 1);
	DropItem(II_WEA_KNU_BLOODY, 15000000, 0, 1);
	DropItem(II_WEA_CHE_BLOODY, 15000000, 0, 1);
	DropItem(II_WEA_WAN_BLOODY2, 15000000, 0, 1);
	DropItem(II_WEA_STA_BLOODY, 15000000, 0, 1);
	DropItem(II_WEA_BOW_BLOODY, 15000000, 0, 1);
	DropItem(II_WEA_YOY_BLOODY, 15000000, 0, 1);

        DropItem(II_GEN_JEW_RIN_INTRING, 6000000, 18, 1);
	DropItem(II_GEN_JEW_RIN_DEXRING, 6000000, 18, 1);
	DropItem(II_GEN_JEW_RIN_STRRING, 6000000, 18, 1);
	DropItem(II_RID_RID_BOR_RIDINGCLOUD04, 6000000, 0, 1);

        DropGold(20000, 30000);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_DRAGONHEART, 4500000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_DRAGONHEART, 450000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_DRAGONCANINE, 3000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_DRAGONCANINE, 3000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_DRAGONCANINE, 3000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_DRAGONCANINE, 3000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_DRAGONCANINE, 3000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_DRAGONCANINE, 3000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_DRAGONCANINE, 3000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_DRAGONCANINE, 3000000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#battle
		{
			berserk 2 1.5
		}
	}
}
// �̺�Ʈ�� ���� ����
MI_DEMIAN5
{
	Maxitem = 16;

	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 3000000000, 0, 1);

	DropItem(II_GEN_REF_REF_TENTH, 3000000000, 0, 20);
	DropItem(II_GEN_POT_DRI_VITAL900, 3000000000, 0, 20);
	DropItem(II_GEN_MAG_TRI_NEWYEARBOMB, 3000000000, 0, 10);
	DropItem(II_GEN_MAG_TRI_FIRESHOWER, 3000000000, 0, 10);
	DropItem(II_GEN_MAG_TRI_SULNALBOMB, 3000000000, 0, 10);
	DropItem(II_GEN_MAG_TRI_GOODBYEBOMB, 3000000000, 0, 10);
	DropItem(II_GEN_MAG_TRI_HWFIREWORKS, 3000000000, 0, 10);
	DropItem(II_RID_RID_BOR_EVEINSHOVER, 2496000000, 0, 1);
	DropItem(II_RID_RID_BOR_LADOLF, 2496000000, 0, 1);
	DropItem(II_CHR_MAG_TRI_ANGELWING, 1248000000, 0, 1);
	DropItem(II_SYS_SYS_EVE_FBOX, 624000000, 0, 1);

	m_nAttackFirstRange = 8;
}
MI_KEAKOON5
{
	Maxitem = 16;

	DropItem(II_GEN_MAT_ELE_FLAME, 2112000000, 0, 1);
	DropItem(II_GEN_MAT_ELE_RIVER, 2112000000, 0, 1);
	DropItem(II_GEN_MAT_ELE_GENERATOR, 2112000000, 0, 1);
	DropItem(II_GEN_MAT_ELE_DESERT, 2112000000, 0, 1);
	DropItem(II_GEN_MAT_ELE_CYCLON, 2112000000, 0, 1);
	DropItem(II_GEN_MAT_ELE_THUNDER, 1056000000, 0, 1);
	DropItem(II_SYS_SYS_EVE_ACROGIFTBOX, 528000000, 0, 1);

	m_nAttackFirstRange = 8;
}
MI_MUFFRIN5
{
	Maxitem = 16;

	DropItem(II_GEN_FOO_INS_STARCANDY, 3000000000, 0, 30);
	DropItem(II_GEN_FOO_COO_SEAFOODPIZZA, 3000000000, 0, 30);
	DropItem(II_GEN_FOO_ICE_FRUITPUNCH, 3000000000, 0, 30);
	DropItem(II_GEN_FOO_PIL_YELLOW, 3000000000, 0, 10);
	DropItem(II_GEN_FOO_PIL_BLUE, 3000000000, 0, 10);
	DropItem(II_GEN_FOO_PIL_RED, 2496000000, 0, 10);
	DropItem(II_GEN_FOO_PIL_GOLD, 2496000000, 0, 10);
	DropItem(II_GEN_FOO_PIL_GRAY, 390000000, 0, 10);
	DropItem(II_GEN_FOO_COO_DDUKGUKHOT, 1248000000, 0, 5);
	DropItem(II_GEN_FOO_COO_DDUKGUKFRESH, 1248000000, 0, 5);
	DropItem(II_GEN_FOO_COO_DDUKGUKSWEET, 1248000000, 0, 5);
	DropItem(II_SYS_SYS_EVE_WHITEGIFTBOX, 624000000, 0, 1);

	m_nAttackFirstRange = 8;
}

// �̱� �̺�Ʈ ����

MI_LOADCLOCKWORK
{
	Maxitem = 8;

	DropItem(II_GEN_JEW_EAR_ATTEARRING, 10000000, 14, 1);
	DropItem(II_GEN_JEW_EAR_ATTEARRING, 25000000, 10, 1);
	DropItem(II_GEN_JEW_EAR_ATTEARRING, 20000000, 14, 1);
	DropItem(II_GEN_JEW_EAR_U_EARRING07, 20000000, 0, 1);
	DropItem(II_GEN_JEW_EAR_U_EARRING08, 10000000, 0, 1);
	DropItem(II_GEN_JEW_EAR_U_EARRING09,  5000000, 0, 1);
	DropItem(II_GEN_JEW_RIN_STRRING, 10000000, 15, 1);
	DropItem(II_GEN_JEW_RIN_STRRING,  5000000, 18, 1);
	DropItem(II_GEN_JEW_RIN_INTRING, 20000000, 9, 1);
	DropItem(II_GEN_JEW_RIN_INTRING, 10000000, 15, 1);
	DropItem(II_GEN_JEW_RIN_INTRING,  5000000, 18, 1);
	DropItem(II_GEN_JEW_RIN_DEXRING, 20000000, 9, 1);
	DropItem(II_GEN_JEW_RIN_DEXRING, 10000000, 15, 1);
	DropItem(II_GEN_JEW_RIN_DEXRING,  5000000, 18, 1);
        DropItem(II_ARM_F_ACR_SET01GAUNTLET, 15000000, 0, 1);
	DropItem(II_ARM_F_ACR_SET01BOOTS  , 15000000, 0, 1);
	DropItem(II_ARM_M_MER_SET01GAUNTLET, 15000000, 0, 1);
	DropItem(II_ARM_M_MER_SET01BOOTS, 15000000, 0, 1);
	DropItem(II_ARM_M_ASS_SET01GAUNTLET, 15000000, 0, 1);
	DropItem(II_ARM_M_ASS_SET01BOOTS, 15000000, 0, 1);
	DropItem(II_ARM_M_MAG_SET01GAUNTLET, 15000000, 0, 1);
	DropItem(II_ARM_M_MAG_SET01BOOTS, 15000000, 0, 1);
	DropItem(II_ARM_F_MER_SET01GAUNTLET, 15000000, 0, 1);
	DropItem(II_ARM_F_MER_SET01BOOTS, 15000000, 0, 1);
	DropItem(II_ARM_F_ASS_SET01GAUNTLET, 15000000, 0, 1);
	DropItem(II_ARM_F_ASS_SET01BOOTS, 15000000, 0, 1);
	DropItem(II_ARM_F_MAG_SET01GAUNTLET, 15000000, 0, 1);
	DropItem(II_ARM_F_MAG_SET01BOOTS, 15000000, 0, 1);
	DropItem(II_ARM_M_ACR_SET01GAUNTLET, 15000000, 0, 1);
	DropItem(II_ARM_M_ACR_SET01BOOTS  , 15000000, 0, 1);
	DropItem(II_WEA_SWO_SET01, 400000000, 0, 1);
	DropItem(II_WEA_AXE_SET01, 400000000, 0, 1);
	DropItem(II_WEA_CHE_SET01, 400000000, 0, 1);
	DropItem(II_WEA_WAN_SET01, 400000000, 0, 1);
	DropItem(II_WEA_STA_SET01, 400000000, 0, 1);
	DropItem(II_WEA_KNU_SET01, 400000000, 0, 1);
	DropItem(II_ARM_M_ACR_SET01SUIT, 75000000, 0, 1);
	DropItem(II_ARM_F_ACR_SET01SUIT, 75000000, 0, 1);
	DropItem(II_ARM_M_MER_SET01SUIT, 75000000, 0, 1);
	DropItem(II_ARM_M_ASS_SET01SUIT, 75000000, 0, 1);
	DropItem(II_ARM_M_MAG_SET01SUIT, 75000000, 0, 1);
	DropItem(II_ARM_F_MER_SET01SUIT, 75000000, 0, 1);
	DropItem(II_ARM_F_ASS_SET01SUIT, 75000000, 0, 1);
	DropItem(II_ARM_F_MAG_SET01SUIT, 75000000, 0, 1);
	DropItem(II_ARM_F_MAG_SET01HELMET, 140000000, 0, 1);
	DropItem(II_ARM_M_ACR_SET01HELMET, 140000000, 0, 1);
	DropItem(II_ARM_F_ACR_SET01HELMET, 140000000, 0, 1);
	DropItem(II_ARM_M_MER_SET01HELMET, 140000000, 0, 1);
	DropItem(II_ARM_M_ASS_SET01HELMET, 140000000, 0, 1);
	DropItem(II_ARM_M_MAG_SET01HELMET, 140000000, 0, 1);
	DropItem(II_ARM_F_MER_SET01HELMET, 140000000, 0, 1);
	DropItem(II_ARM_F_ASS_SET01HELMET, 140000000, 0, 1);
        DropItem(II_ARM_ARM_SHI_RUKENSHIA, 500000000, 0, 1);         
        DropItem(II_ARM_ARM_SHI_TOEFFIN, 500000000, 0, 1);	//(������ �������� �����)
        DropItem(II_ARM_ARM_SHI_TOEFFIN, 500000000, 0, 1);            
        DropItem(II_ARM_ARM_SHI_CATEPO, 500000000, 0, 1);
	DropItem(II_GEN_JEW_EAR_ATTEARRING, 1500000000, 12, 1);
	DropItem(II_GEN_JEW_RIN_STRRING, 1500000000, 9, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 30 2
                        recovery 5 20 100 m            
                    }
		#move
		    {
			
		    }	
   	}               

}

MI_BRIGADIER
{
	Maxitem = 8;

	DropItem(II_GEN_JEW_RIN_STRRING, 36000000, 4, 1);
	DropItem(II_GEN_JEW_RIN_INTRING, 36000000, 4, 1);
	DropItem(II_GEN_JEW_RIN_DEXRING, 36000000, 4, 1);
	DropItem(II_GEN_JEW_RIN_STARING, 36000000, 4, 1);
	DropItem(II_GEN_JEW_NEC_HPNECKLACE, 36000000, 4, 1);
	DropItem(II_GEN_JEW_NEC_MPNECKLACE, 36000000, 11, 1);
	DropItem(II_GEN_JEW_NEC_FPNECKLACE, 36000000, 11, 1);
	DropItem(II_GEN_JEW_EAR_ATTEARRING, 36000000, 3, 1);
	DropItem(II_GEN_JEW_EAR_DEFEARRING, 36000000, 9, 1);

	DropKind(IK3_SWD, 95, 109);
	DropKind(IK3_AXE, 95, 109);
	DropKind(IK3_CHEERSTICK, 95, 109);
	DropKind(IK3_KNUCKLEHAMMER, 95, 109);
	DropKind(IK3_SHIELD, 95, 109);
	DropKind(IK3_BOW, 95, 109);
	DropKind(IK3_YOYO, 95, 109);
	DropKind(IK3_WAND, 95, 109);
	DropKind(IK3_STAFF, 95, 109);
	DropKind(IK3_HELMET, 95, 109);
	DropKind(IK3_SUIT, 95, 109);
	DropKind(IK3_GAUNTLET, 95, 109);
	DropKind(IK3_BOOTS, 95, 109);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 30 1.5
                        recovery 5 20 100 m            
                    }
		#move
		    {
			
		    }	
   	}               

}

MI_LIEUTENANT 
{
	Maxitem = 8;

	DropItem(II_GEN_JEW_RIN_STRRING, 360000000, 5, 1);
	DropItem(II_GEN_JEW_RIN_INTRING, 360000000, 5, 1);
	DropItem(II_GEN_JEW_RIN_DEXRING, 360000000, 5, 1);
	DropItem(II_GEN_JEW_RIN_STARING, 360000000, 5, 1);
	DropItem(II_GEN_JEW_NEC_HPNECKLACE, 360000000, 5, 1);
	DropItem(II_GEN_JEW_NEC_MPNECKLACE, 360000000, 15, 1);
	DropItem(II_GEN_JEW_NEC_FPNECKLACE, 360000000, 14, 1);
	DropItem(II_GEN_JEW_EAR_ATTEARRING, 360000000, 4, 1);
	DropItem(II_GEN_JEW_EAR_DEFEARRING, 360000000, 11, 1);

	DropKind(IK3_SWD, 95, 109);
	DropKind(IK3_AXE, 95, 109);
	DropKind(IK3_CHEERSTICK, 95, 109);
	DropKind(IK3_KNUCKLEHAMMER, 95, 109);
	DropKind(IK3_WAND, 95, 109);
	DropKind(IK3_SHIELD, 95, 109);
	DropKind(IK3_BOW, 95, 109);
	DropKind(IK3_YOYO, 95, 109);
	DropKind(IK3_STAFF, 95, 109);
	DropKind(IK3_HELMET, 95, 109);
	DropKind(IK3_SUIT, 95, 109);
	DropKind(IK3_GAUNTLET, 95, 109);
	DropKind(IK3_BOOTS, 95, 109);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 30 1.5
                        recovery 5 20 100 m            
                    }
		#move
		    {
			
		    }	
   	}               

}

MI_SPIKETAIL 
{
	Maxitem = 8;

	DropItem(II_GEN_JEW_RIN_STRRING, 360000000, 5, 1);
	DropItem(II_GEN_JEW_RIN_INTRING, 360000000, 5, 1);
	DropItem(II_GEN_JEW_RIN_DEXRING, 360000000, 5, 1);
	DropItem(II_GEN_JEW_RIN_STARING, 360000000, 5, 1);
	DropItem(II_GEN_JEW_NEC_HPNECKLACE, 360000000, 5, 1);
	DropItem(II_GEN_JEW_NEC_MPNECKLACE, 360000000, 15, 1);
	DropItem(II_GEN_JEW_NEC_FPNECKLACE, 360000000, 14, 1);
	DropItem(II_GEN_JEW_EAR_ATTEARRING, 360000000, 4, 1);
	DropItem(II_GEN_JEW_EAR_DEFEARRING, 360000000, 11, 1);

	DropKind(IK3_SWD, 95, 109);
	DropKind(IK3_AXE, 95, 109);
	DropKind(IK3_CHEERSTICK, 95, 109);
	DropKind(IK3_KNUCKLEHAMMER, 95, 109);
	DropKind(IK3_WAND, 95, 109);
	DropKind(IK3_STAFF, 95, 109);
	DropKind(IK3_SHIELD, 95, 109);
	DropKind(IK3_BOW, 95, 109);
	DropKind(IK3_YOYO, 95, 109);
	DropKind(IK3_HELMET, 95, 109);
	DropKind(IK3_SUIT, 95, 109);
	DropKind(IK3_GAUNTLET, 95, 109);
	DropKind(IK3_BOOTS, 95, 109);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 30 1.5
                        recovery 5 20 100 m            
                    }
		#move
		    {
			
		    }	
   	}               

}

MI_GLYPHAXZ 
{
	Maxitem = 8;

	DropItem(II_GEN_JEW_RIN_STRRING, 360000000, 6, 1);
	DropItem(II_GEN_JEW_RIN_INTRING, 360000000, 6, 1);
	DropItem(II_GEN_JEW_RIN_DEXRING, 360000000, 6, 1);
	DropItem(II_GEN_JEW_RIN_STARING, 360000000, 6, 1);
	DropItem(II_GEN_JEW_NEC_HPNECKLACE, 360000000, 6, 1);
	DropItem(II_GEN_JEW_NEC_MPNECKLACE, 360000000, 20, 1);
	DropItem(II_GEN_JEW_NEC_FPNECKLACE, 360000000, 19, 1);
	DropItem(II_GEN_JEW_EAR_ATTEARRING, 360000000, 4, 1);
	DropItem(II_GEN_JEW_EAR_DEFEARRING, 360000000, 13, 1);

	DropKind(IK3_SWD, 95, 109);
	DropKind(IK3_AXE, 95, 109);
	DropKind(IK3_CHEERSTICK, 95, 109);
	DropKind(IK3_KNUCKLEHAMMER, 95, 109);
	DropKind(IK3_WAND, 95, 109);
	DropKind(IK3_SHIELD, 95, 109);
	DropKind(IK3_BOW, 95, 109);
	DropKind(IK3_YOYO, 95, 109);
        DropKind(IK3_STAFF, 95, 109);
	DropKind(IK3_HELMET, 95, 109);
	DropKind(IK3_SUIT, 95, 109);
	DropKind(IK3_GAUNTLET, 95, 109);
	DropKind(IK3_BOOTS, 95, 109);
	
	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 1.7
                        summon 50 2 MI_DU_DKKIMERADON1       
                    }
		#move
		    {
			
		    }	
   	}               

}


//�̺������� ��� ����

MI_IBLCRASHER
{
	Maxitem = 2;

        DropGold(43, 62);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_MAT_ORICHALCUM01, 14500000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 2800000, 0, 1);

	DropItem(II_GEN_GEM_GEM_TOMBMARBLE, 100000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 1.5
                    }
		#move
		    {
			
		    }	
   	}               

}

MI_IBLPOISONER
{
	Maxitem = 2;

        DropGold(55, 75);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_GOLDENCUP, 200000000, 0, 1);

	DropItem(II_GEN_MAT_ORICHALCUM01, 14500000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 2800000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 1.5
                    }
		#move
		    {
			
		    }	
   	}               

}

MI_IBLWRECKER
{
	Maxitem = 2;

        DropGold(62, 80);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_ZOMBYHOE, 200000000, 0, 1);

	DropItem(II_GEN_MAT_ORICHALCUM01, 14500000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 2800000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 1.5
                    }
		#move
		    {
			
		    }	
   	}               

}

MI_IBLDOZER
{
	Maxitem = 2;

        DropGold(100, 110);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_MAT_ORICHALCUM01, 14500000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 2800000, 0, 1);

	DropItem(II_GEN_GEM_GEM_GRBANDAGE, 300000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 1.5
                    }
		#move
		    {
			
		    }	
   	}               

}

MI_IBLPUPPET
{
	Maxitem = 2;

        DropGold(100, 150);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_MAT_ORICHALCUM01, 14500000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 2800000, 0, 1);

	DropItem(II_GEN_GEM_GEM_GARBAGETON, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 1.5
                    }
		#move
		    {
			
		    }	
   	}               

}

MI_IBLTAKER
{
	Maxitem = 2;

        DropGold(150, 200);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_MAT_ORICHALCUM01, 14500000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 2800000, 0, 1);

	DropItem(II_GEN_GEM_GEM_SYCALE, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 1.5
                    }
		#move
		    {
			
		    }	
   	}               

}

MI_IBLREDOTEM
{
	Maxitem = 2;

        DropGold(1, 1000);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_MAT_ORICHALCUM01, 14500000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 2800000, 0, 1);

	DropItem(II_GEN_GEM_GEM_RANGLASS, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 1.5
                    }
		#move
		    {
			
		    }	
   	}               

}

MI_IBLBLACKOTEM
{
	Maxitem = 2;

        DropGold(1, 1000);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_MAT_ORICHALCUM01, 14500000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 2800000, 0, 1);

	DropItem(II_GEN_GEM_GEM_GRBANDAGE, 1000000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 1.5
                    }
		#move
		    {
			
		    }	
   	}               

}

MI_IBLBOXTER
{
	Maxitem = 10;

        DropGold(100, 200);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

        DropItem(II_WEA_SWO_IBLLINESS, 500000, 0, 1);
        DropItem(II_WEA_SWT_IBLLINESS, 500000, 0, 1);
        DropItem(II_WEA_AXE_IBLLINESS, 500000, 0, 1);
        DropItem(II_WEA_AXT_IBLLINESS, 500000, 0, 1);
        DropItem(II_WEA_KNU_IBLLINESS, 500000, 0, 1);
        DropItem(II_WEA_CHE_IBLLINESS, 500000, 0, 1);
        DropItem(II_WEA_WAN_IBLLINESS, 500000, 0, 1);
        DropItem(II_WEA_STA_IBLLINESS, 500000, 0, 1);
        DropItem(II_WEA_BOW_IBLLINESS, 500000, 0, 1);
        DropItem(II_WEA_YOY_IBLLINESS, 500000, 0, 1);
        DropItem(II_ARM_ARM_SHI_CONTRA, 500000, 0, 1);

	DropItem(II_GEN_MAT_ELE_CANDLE, 3000000, 0, 1);		//	ĵ�� ī��
	DropItem(II_GEN_MAT_ELE_RAIN, 3000000, 0, 1);			//	���� ī��
	DropItem(II_GEN_MAT_ELE_BREEZE, 3000000, 0, 1);		//	�긮�� ī��
	DropItem(II_GEN_MAT_ELE_SPARK, 3000000, 0, 1);		        //	����ũ ī��
        DropItem(II_GEN_MAT_ELE_SAND, 3000000, 0, 1);                  //      �ڵ� ī��
	DropItem(II_GEN_MAT_ELE_FLAME, 3000000, 0, 1);		        //	��ġ ī��
	DropItem(II_GEN_MAT_ELE_RIVER, 3000000, 0, 1);			//	����ũ ī��
	DropItem(II_GEN_MAT_ELE_GENERATOR, 3000000, 0, 1);		//	�������� ī��
	DropItem(II_GEN_MAT_ELE_DESERT, 3000000, 0, 1);		        //	���� ī��
	DropItem(II_GEN_MAT_ELE_CYCLON, 3000000, 0, 1);			//	���� ī��
	DropItem(II_GEN_MAT_ELE_FLAME, 2000000, 0, 1);		        //	�÷��� ī��
	DropItem(II_GEN_MAT_ELE_RIVER, 2000000, 0, 1);		        //	���� ī��
	DropItem(II_GEN_MAT_ELE_GENERATOR, 2000000, 0, 1);		//	���ʷ����� ī��
	DropItem(II_GEN_MAT_ELE_DESERT, 2000000, 0, 1);			//	����Ʈ ī��
	DropItem(II_GEN_MAT_ELE_CYCLON, 2000000, 0, 1);			//	����Ŭ�� ī��

        DropItem(II_GEN_GEM_GEM_POPORAM, 100000000, 0, 1);		//	������
	DropItem(II_GEN_GEM_GEM_SLAIN, 100000000, 0, 1);		//	������
	DropItem(II_GEN_GEM_GEM_TARINROOT, 100000000, 0, 1);		//	Ÿ���Ѹ�
	DropItem(II_GEN_GEM_GEM_STARSTONE, 100000000, 0, 1);		//	����
	DropItem(II_GEN_GEM_GEM_GOLDENWING, 100000000, 0, 1);		//	Ȳ�ݳ���
	DropItem(II_GEN_GEM_GEM_BLUEHONEY, 100000000, 0, 1);		//	�������
	DropItem(II_GEN_GEM_GEM_MIADOLL, 100000000, 0, 1);		//	�̾��� ����
	DropItem(II_GEN_GEM_GEM_FURIOUSMATCH, 100000000, 0, 1);	        //	��ȭ����
	DropItem(II_GEN_GEM_GEM_CARDRIN, 100000000, 0, 1);		//	ī�帰
	DropItem(II_GEN_GEM_GEM_HAMMARBLE, 100000000, 0, 1);		//	�ܸ���
	DropItem(II_GEN_GEM_GEM_GIGGLANDE, 100000000, 0, 1);		//	��۷���
	DropItem(II_GEN_GEM_GEM_MOONSTONE, 100000000, 0, 1);		//	���弮
	DropItem(II_GEN_GEM_GEM_BOBAND, 100000000, 0, 1);		//	������
	DropItem(II_GEN_GEM_GEM_DUMBLING, 100000000, 0, 1);		//	������
	DropItem(II_GEN_GEM_GEM_KALIN, 100000000, 0, 1);		//	Į�������
	DropItem(II_GEN_GEM_GEM_CLOCKHEART, 100000000, 0, 1);		//	Ŭ����Ʈ
	DropItem(II_GEN_GEM_GEM_TOMBMARBLE, 100000000, 0, 1);		//	������
	DropItem(II_GEN_GEM_GEM_GOLDENFIST, 100000000, 0, 1);		//	Ȳ���ָ�
	DropItem(II_GEN_GEM_GEM_ORBRIN, 100000000, 0, 1);		//	���기
	DropItem(II_GEN_GEM_GEM_GOLDENCUP, 100000000, 0, 1);		//	Ȳ����

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 30 2.0
                    }
		#move
		    {
			
		    }	
   	}               

}

MI_IBLDANDISHER
{
	Maxitem = 2;

        DropGold(150, 200);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_MAT_ORICHALCUM01, 5000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 4000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 1.5
                    }
		#move
		    {
			
		    }	
   	}               

}

MI_IBLGUARDER
{
	Maxitem = 2;

        DropGold(100, 700);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_MAT_ORICHALCUM01, 14500000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 2800000, 0, 1);

        DropItem(II_SYS_SYS_QUE_RUBY01, 3000000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 1.0
                    }
		#move
		    {
			
		    }	
   	}               

}

MI_IBLQUAKER
{
	Maxitem = 2;

        DropGold(100, 750);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_MAT_ORICHALCUM01, 14500000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 2800000, 0, 1);

        DropItem(II_SYS_SYS_QUE_RUBY02, 3000000000, 0, 1);


	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 1.0
                    }
		#move
		    {
			
		    }	
   	}               

}


MI_IBLMUCILAGER
{
	Maxitem = 2;

        DropGold(100, 800);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_MAT_ORICHALCUM01, 14500000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 2800000, 0, 1);

        DropItem(II_SYS_SYS_QUE_RUBY03, 3000000000, 0, 1);


	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 1.0
                    }
		#move
		    {
			
		    }	
   	}               

}


MI_IBLLINESS
{
	Maxitem = 3;

        DropGold(500, 2000);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

        DropItem(II_WEA_SWO_IBLLINESS, 8000000, 0, 1);
        DropItem(II_WEA_SWT_IBLLINESS, 8000000, 0, 1);
        DropItem(II_WEA_AXE_IBLLINESS, 8000000, 0, 1);
        DropItem(II_WEA_AXT_IBLLINESS, 8000000, 0, 1);
        DropItem(II_WEA_KNU_IBLLINESS, 8000000, 0, 1);
        DropItem(II_WEA_CHE_IBLLINESS, 8000000, 0, 1);
        DropItem(II_WEA_WAN_IBLLINESS, 8000000, 0, 1);
        DropItem(II_WEA_STA_IBLLINESS, 8000000, 0, 1);
        DropItem(II_WEA_BOW_IBLLINESS, 8000000, 0, 1);
        DropItem(II_WEA_YOY_IBLLINESS, 8000000, 0, 1);
        DropItem(II_ARM_ARM_SHI_CONTRA, 8000000, 0, 1);

	DropItem(II_GEN_MAT_ORICHALCUM01, 14500000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 2800000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                        Berserk 30 1.5
			summon 30 3 MI_IBLDANDISHER
			recovery 10 30 100 m            
                    }
		#move
		    {
			
		    }	
   	}               
}                 

MI_CYCLOPSX
{
	Maxitem = 3;
        DropGold(500, 2000);

	DropItem(II_WEA_SWO_BLOODY, 450, 0, 1);
	DropItem(II_WEA_SWT_BLOODY, 450, 0, 1);
	DropItem(II_WEA_AXE_BLOODY, 450, 0, 1);
	DropItem(II_WEA_AXT_BLOODY, 450, 0, 1);
	DropItem(II_WEA_KNU_BLOODY, 450, 0, 1);
	DropItem(II_WEA_CHE_BLOODY, 450, 0, 1);
	DropItem(II_WEA_WAN_BLOODY2, 450, 0, 1);
	DropItem(II_WEA_STA_BLOODY, 450, 0, 1);
	DropItem(II_WEA_BOW_BLOODY, 450, 0, 1);
	DropItem(II_WEA_YOY_BLOODY, 450, 0, 1);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_STRANGEEYES, 300000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 2.0
                    }
		#move
		    {
			
		    }	
   	}               

}

MI_NPC_YETI01
{
	Maxitem = 2;
        DropGold(500, 2000);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_REDCRYSTAL, 300000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 1500000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE,  1500000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
                    }
		#move
		    {
	            }	
   	}               

}

MI_NPC_YETI02
{
	Maxitem = 2;
        DropGold(500, 2000);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_REDCRYSTAL, 300000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 1500000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE,  1500000, 0, 1);

	m_nAttackFirstRange = 10;
	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
                    }
		#move
		    {
	            }	
   	}               

}

MI_NPC_AUGOO01
{
	Maxitem = 2;
        DropGold(500, 2000);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_YELLOWCRYSTAL, 300000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE,  3000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
                    }
		#move
		    {
	            }	
   	}               

}

MI_NPC_AUGOO02
{
	Maxitem = 2;
        DropGold(500, 2000);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_YELLOWCRYSTAL, 300000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE,  3000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
                    }
		#move
		    {
	            }	
   	}               

}

MI_NPC_SADKING01
{
	Maxitem = 2;
        DropGold(500, 2000);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_GREENCRYSTAL, 300000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE,  3000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
                    }
		#move
		    {
	            }	
   	}               

}
MI_NPC_SADKING02
{
	Maxitem = 2;
        DropGold(500, 2000);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_GREENCRYSTAL, 300000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 4500000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE,  4500000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
                    }
		#move
		    {
	            }	
   	}               

}
MI_NPC_MAMMOTH01
{
	Maxitem = 2;
        DropGold(500, 2000);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_BLUECRYSTAL, 300000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 4500000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE,  4500000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
                    }
		#move
		    {
	            }	
   	}               

}
MI_NPC_MAMMOTH02
{
	Maxitem = 2;
        DropGold(500, 2000);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_BLUECRYSTAL, 300000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 4500000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE,  4500000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
                    }
		#move
		    {
	            }	
   	}               

}

MI_EVENT01
{
	Maxitem = 30;

	DropItem(II_SYS_SYS_EVE_BALLOON_01, 3000000000, 0, 1);
	DropItem(II_SYS_SYS_EVE_BALLOON01_01, 3000000000, 0, 1);
	DropItem(II_SYS_SYS_EVE_BALLOON02_01, 3000000000, 0, 1);

	DropItem(II_SYS_SYS_SCR_COTTONCANDYVIOLET_01, 3000000000, 0, 1);
	DropItem(II_SYS_SYS_SCR_COTTONCANDYBLUE_01, 3000000000, 0, 1);
	DropItem(II_SYS_SYS_SCR_COTTONCANDYGREEN_01, 3000000000, 0, 1);
	DropItem(II_SYS_SYS_SCR_COTTONCANDYRED_01, 3000000000, 0, 1);
	DropItem(II_SYS_SYS_SCR_COTTONCANDYBLUESKY_01, 3000000000, 0, 1);
	DropItem(II_SYS_SYS_SCR_COTTONCANDYPINK_01, 3000000000, 0, 1);
	DropItem(II_SYS_SYS_SCR_COTTONCANDYYELLOW_01, 3000000000, 0, 1);
	DropItem(II_SYS_SYS_SCR_COTTONCANDYWHITE_01, 3000000000, 0, 1);
	DropItem(II_SYS_SYS_SCR_COTTONCANDYGRAY_01, 3000000000, 0, 1);
	DropItem(II_SYS_SYS_SCR_COTTONCANDYORANGE_01, 3000000000, 0, 1);

	DropItem(II_GEN_FOO_COO_MEDICINE02, 3000000000, 0, 10);
	DropItem(II_GEN_FOO_PIL_SINBI, 3000000000, 0, 10);
	DropItem(II_GEN_FOO_COO_MEDICINE02, 3000000000, 0, 10);
	DropItem(II_GEN_FOO_PIL_SINBI, 3000000000, 0, 10);
	DropItem(II_GEN_FOO_COO_MEDICINE02, 3000000000, 0, 10);
	DropItem(II_GEN_FOO_PIL_SINBI, 3000000000, 0, 10);
	DropItem(II_GEN_FOO_COO_MEDICINE02, 3000000000, 0, 10);
	DropItem(II_GEN_FOO_PIL_SINBI, 3000000000, 0, 10);
	DropItem(II_GEN_FOO_COO_MEDICINE02, 3000000000, 0, 10);
	DropItem(II_GEN_FOO_PIL_SINBI, 3000000000, 0, 10);
	DropItem(II_GEN_FOO_COO_MEDICINE02, 3000000000, 0, 10);
	DropItem(II_GEN_FOO_PIL_SINBI, 3000000000, 0, 10);
	DropItem(II_GEN_FOO_COO_MEDICINE02, 3000000000, 0, 10);
	DropItem(II_GEN_FOO_PIL_SINBI, 3000000000, 0, 10);
	DropItem(II_GEN_FOO_COO_MEDICINE02, 3000000000, 0, 10);
	DropItem(II_GEN_FOO_PIL_SINBI, 3000000000, 0, 10);
	DropItem(II_GEN_FOO_PIL_SINBI, 3000000000, 0, 10);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 2.0
                    }
		#move
		    {
			
		    }	
   	}                
}

MI_EVENT02
{
	Maxitem = 30;

	DropItem(II_SYS_SYS_EVE_BALLOON_01, 3000000000, 0, 1);
	DropItem(II_SYS_SYS_EVE_BALLOON01_01, 3000000000, 0, 1);
	DropItem(II_SYS_SYS_EVE_BALLOON02_01, 3000000000, 0, 1);
	DropItem(II_SYS_SYS_EVE_BALLOON_01, 3000000000, 0, 1);
	DropItem(II_SYS_SYS_EVE_BALLOON01_01, 3000000000, 0, 1);
	DropItem(II_SYS_SYS_EVE_BALLOON02_01, 3000000000, 0, 1);
	DropItem(II_SYS_SYS_EVE_BALLOON_01, 3000000000, 0, 1);
	DropItem(II_SYS_SYS_EVE_BALLOON01_01, 3000000000, 0, 1);
	DropItem(II_SYS_SYS_EVE_BALLOON02_01, 3000000000, 0, 1);

	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 3000000000, 0, 1);



	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 2.0
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_EVENT03
{
	Maxitem = 50;



	DropItem(II_SYS_SYS_SCR_BXSUHO01, 3000000000, 0, 1);
	DropItem(II_SYS_SYS_SCR_BXSUHO01, 3000000000, 0, 1);
	DropItem(II_SYS_SYS_SCR_BXUSU01, 3000000000, 0, 1);

	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 3000000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 2.0
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_EVENT04
{
	Maxitem = 50;

	DropItem(II_SYS_SYS_SCR_BXUSU01, 3000000000, 0, 1);
	DropItem(II_SYS_SYS_SCR_BXUSU01, 3000000000, 0, 1);
	DropItem(II_SYS_SYS_SCR_BXANGEL01, 3000000000, 0, 1);

	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 3000000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 3000000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 2.0
                    }
		#move
		    {
			
		    }	
   	}               
}

//12�� ���� �߰� ����(�ӽù���)
MI_CAITSITH01
{
	Maxitem = 2;
	DropGold(12, 18);

	DropItem(II_GEN_GEM_GEM_CATBELL, 300000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_CAITSITH02
{
	Maxitem = 2;
	DropGold(12, 18);
	
	DropItem(II_GEN_GEM_GEM_CATBELL, 300000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_CAITSITH03
{
	Maxitem = 2;
	DropGold(12, 18);
	
	DropItem(II_GEN_GEM_GEM_CATBELL, 300000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_CAITSITH04
{
	Maxitem = 5;
	DropGold(420, 609);
	DropKind(IK3_SWD, 61, 68);
	DropKind(IK3_AXE, 61, 68);
	DropKind(IK3_CHEERSTICK, 61, 68);
	DropKind(IK3_KNUCKLEHAMMER, 61, 68);
	DropKind(IK3_WAND, 61, 68);
	DropKind(IK3_STAFF, 61, 68);
	DropKind(IK3_HELMET, 61, 68);
	DropKind(IK3_SUIT, 61, 68);
	DropKind(IK3_GAUNTLET, 61, 68);
	DropKind(IK3_BOOTS, 61, 68);
	DropKind(IK3_SHIELD, 61, 68);
	DropKind(IK3_BOW, 61, 68);
	DropKind(IK3_YOYO, 61, 68);

	DropItem(II_GEN_MAT_ELE_RIVER, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_RIVER, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropItem(II_GEN_GEM_GEM_CATBELL, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_CATBELL, 1000000000, 0, 1);

	DropItem(II_GEN_POT_DRI_VITAL700,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_SEVENTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_INS_HODDUK, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_INS_HODDUK, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_INS_HODDUK, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_FRUITPARFAIT, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_FRUITPARFAIT, 600000001, 0, 1);
	
	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_CAITSITH04_1
{
	Maxitem = 2;
	DropGold(420, 609);
	DropKind(IK3_SWD, 61, 68);
	DropKind(IK3_AXE, 61, 68);
	DropKind(IK3_CHEERSTICK, 61, 68);
	DropKind(IK3_KNUCKLEHAMMER, 61, 68);
	DropKind(IK3_WAND, 61, 68);
	DropKind(IK3_STAFF, 61, 68);
	DropKind(IK3_HELMET, 61, 68);
	DropKind(IK3_SUIT, 61, 68);
	DropKind(IK3_GAUNTLET, 61, 68);
	DropKind(IK3_BOOTS, 61, 68);
	DropKind(IK3_SHIELD, 61, 68);
	DropKind(IK3_BOW, 61, 68);
	DropKind(IK3_YOYO, 61, 68);	
	DropItem(II_GEN_GEM_GEM_CATBELL, 300000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_HARPY01
{
	Maxitem = 2;
	DropGold(12, 18);
	
	DropItem(II_GEN_GEM_GEM_HARPYFEATHER, 300000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_HARPY02
{
	Maxitem = 2;
	DropGold(12, 18);
	
	DropItem(II_GEN_GEM_GEM_HARPYFEATHER, 300000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_HARPY03
{
	Maxitem = 2;
	DropGold(12, 18);
	
	DropItem(II_GEN_GEM_GEM_HARPYFEATHER, 300000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                    }
		#move
		    {
			
		    }	
   	}               
}


MI_HARPY04
{
	Maxitem = 5;
	DropGold(464, 673);

	DropItem(II_WEA_SWO_SUHO, 3150000, 0, 1);
	DropItem(II_WEA_SWT_SUHO, 3150000, 0, 1);
	DropItem(II_WEA_AXE_SUHO, 3150000, 0, 1);
	DropItem(II_WEA_AXT_SUHO, 3150000, 0, 1);
	DropItem(II_WEA_KNU_SUHO, 3150000, 0, 1);
	DropItem(II_WEA_CHE_SUHO, 3150000, 0, 1);
	DropItem(II_WEA_WAN_SUHO, 3150000, 0, 1);
	DropItem(II_WEA_STA_SUHO, 3150000, 0, 1);
	DropItem(II_WEA_BOW_SUHO, 3150000, 0, 1);
	DropItem(II_WEA_YOY_SUHO, 3150000, 0, 1);


	DropItem(II_GEN_JEW_RIN_STRRING, 4166000, 4, 1);
	DropItem(II_GEN_JEW_RIN_INTRING, 4166000, 4, 1);

	DropKind(IK3_SWD, 70, 76);
	DropKind(IK3_AXE, 70, 76);
	DropKind(IK3_CHEERSTICK, 70, 76);
	DropKind(IK3_KNUCKLEHAMMER, 70, 76);
	DropKind(IK3_WAND, 70, 76);
	DropKind(IK3_STAFF, 70, 76);
	DropKind(IK3_HELMET, 70, 76);
	DropKind(IK3_SUIT, 70, 76);
	DropKind(IK3_GAUNTLET, 70, 76);
	DropKind(IK3_BOOTS, 70, 76);
	DropKind(IK3_SHIELD, 70, 76);
	DropKind(IK3_BOW, 70, 76);
	DropKind(IK3_YOYO, 70, 76);
	DropKind(IK3_THSWD, 70, 76);
	DropKind(IK3_THAXE, 70, 76);

	DropItem(II_GEN_MAT_ELE_DESERT, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_DESERT, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropItem(II_GEN_GEM_GEM_HARPYFEATHER, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_HARPYFEATHER, 1000000000, 0, 1);

	DropItem(II_GEN_POT_DRI_VITAL800,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_EIGHTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);
	
	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_HARPY04_1
{
	Maxitem = 2;
	DropGold(464, 673);
	DropKind(IK3_SWD, 70, 76);
	DropKind(IK3_AXE, 70, 76);
	DropKind(IK3_CHEERSTICK, 70, 76);
	DropKind(IK3_KNUCKLEHAMMER, 70, 76);
	DropKind(IK3_WAND, 70, 76);
	DropKind(IK3_STAFF, 70, 76);
	DropKind(IK3_HELMET, 70, 76);
	DropKind(IK3_SUIT, 70, 76);
	DropKind(IK3_GAUNTLET, 70, 76);
	DropKind(IK3_BOOTS, 70, 76);
	DropKind(IK3_SHIELD, 70, 76);
	DropKind(IK3_BOW, 70, 76);
	DropKind(IK3_YOYO, 70, 76);
	DropKind(IK3_THSWD, 70, 76);
	DropKind(IK3_THAXE, 70, 76);	
	DropItem(II_GEN_GEM_GEM_HARPYFEATHER, 300000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_POLEVIK01
{
	Maxitem = 2;
	DropGold(12, 18);
	
	DropItem(II_GEN_GEM_GEM_POLEVIKMUD, 300000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_POLEVIK02
{
	Maxitem = 2;
	DropGold(12, 18);

	DropItem(II_GEN_GEM_GEM_POLEVIKMUD, 300000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_POLEVIK03
{
	Maxitem = 2;
	DropGold(12, 18);

	DropItem(II_GEN_GEM_GEM_POLEVIKMUD, 300000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                    }
		#move
		    {
			
		    }	
   	}               
}


MI_POLEVIK04
{
	Maxitem = 5;
	DropGold(515, 747);

	DropItem(II_WEA_SWO_USU, 3150000, 0, 1);
	DropItem(II_WEA_SWT_USU, 3150000, 0, 1);
	DropItem(II_WEA_AXE_USU, 3150000, 0, 1);
	DropItem(II_WEA_AXT_USU, 3150000, 0, 1);
	DropItem(II_WEA_KNU_USU, 3150000, 0, 1);
	DropItem(II_WEA_CHE_USU, 3150000, 0, 1);
	DropItem(II_WEA_WAN_USU, 3150000, 0, 1);
	DropItem(II_WEA_STA_USU, 3150000, 0, 1);
	DropItem(II_WEA_BOW_USU, 3150000, 0, 1);
	DropItem(II_WEA_YOY_USU, 3150000, 0, 1);

	DropItem(II_GEN_JEW_RIN_STRRING, 4166000, 4, 1);
	DropItem(II_GEN_JEW_RIN_INTRING, 4166000, 4, 1);

	DropKind(IK3_SWD, 71, 81);
	DropKind(IK3_AXE, 71, 81);
	DropKind(IK3_CHEERSTICK, 71, 81);
	DropKind(IK3_KNUCKLEHAMMER, 71, 81);
	DropKind(IK3_WAND, 71, 81);
	DropKind(IK3_STAFF, 71, 81);
	DropKind(IK3_HELMET, 71, 81);
	DropKind(IK3_SUIT, 71, 81);
	DropKind(IK3_GAUNTLET, 71, 81);
	DropKind(IK3_BOOTS, 71, 81);
	DropKind(IK3_SHIELD, 71, 81);
	DropKind(IK3_BOW, 71, 81);
	DropKind(IK3_YOYO, 71, 81);
	DropKind(IK3_THSWD, 71, 81);
	DropKind(IK3_THAXE, 71, 81);

	DropItem(II_GEN_MAT_ELE_RIVER, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_RIVER, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropItem(II_GEN_GEM_GEM_POLEVIKMUD, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_POLEVIKMUD, 1000000000, 0, 1);

	DropItem(II_GEN_POT_DRI_VITAL800,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_EIGHTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);
	
	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_POLEVIK04_1
{
	Maxitem = 2;
	DropGold(515, 747);
	DropKind(IK3_SWD, 71, 81);
	DropKind(IK3_AXE, 71, 81);
	DropKind(IK3_CHEERSTICK, 71, 81);
	DropKind(IK3_KNUCKLEHAMMER, 71, 81);
	DropKind(IK3_WAND, 71, 81);
	DropKind(IK3_STAFF, 71, 81);
	DropKind(IK3_HELMET, 71, 81);
	DropKind(IK3_SUIT, 71, 81);
	DropKind(IK3_GAUNTLET, 71, 81);
	DropKind(IK3_BOOTS, 71, 81);
	DropKind(IK3_SHIELD, 71, 81);
	DropKind(IK3_BOW, 71, 81);
	DropKind(IK3_YOYO, 71, 81);
	DropKind(IK3_THSWD, 71, 81);
	DropKind(IK3_THAXE, 71, 81);	
	DropItem(II_GEN_GEM_GEM_POLEVIKMUD, 300000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_ABRAXAS01
{
	Maxitem = 2;
	DropGold(12, 18);
	
	DropItem(II_GEN_GEM_GEM_BADTONGUE, 300000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_ABRAXAS02
{
	Maxitem = 2;
	DropGold(12, 18);
	
	DropItem(II_GEN_GEM_GEM_BADTONGUE, 300000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_ABRAXAS03
{
	Maxitem = 2;
	DropGold(12, 18);
	
	DropItem(II_GEN_GEM_GEM_BADTONGUE, 300000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                    }
		#move
		    {
			
		    }	
   	}               
}


MI_ABRAXAS04
{
	Maxitem = 5;
	DropGold(560, 812);

	DropItem(II_WEA_SWO_USU, 4050000, 0, 1);
	DropItem(II_WEA_SWT_USU, 4050000, 0, 1);
	DropItem(II_WEA_AXE_USU, 4050000, 0, 1);
	DropItem(II_WEA_AXT_USU, 4050000, 0, 1);
	DropItem(II_WEA_KNU_USU, 4050000, 0, 1);
	DropItem(II_WEA_CHE_USU, 4050000, 0, 1);
	DropItem(II_WEA_WAN_USU, 4050000, 0, 1);
	DropItem(II_WEA_STA_USU, 4050000, 0, 1);
	DropItem(II_WEA_BOW_USU, 4050000, 0, 1);
	DropItem(II_WEA_YOY_USU, 4050000, 0, 1);

	DropItem(II_GEN_JEW_RIN_STRRING, 4166000, 4, 1);
	DropItem(II_GEN_JEW_RIN_INTRING, 4166000, 4, 1);

	DropKind(IK3_SWD, 73, 89);
	DropKind(IK3_AXE, 73, 89);
	DropKind(IK3_CHEERSTICK, 73, 89);
	DropKind(IK3_KNUCKLEHAMMER, 73, 89);
	DropKind(IK3_WAND, 73, 89);
	DropKind(IK3_STAFF, 73, 89);
	DropKind(IK3_HELMET, 73, 89);
	DropKind(IK3_SUIT, 73, 89);
	DropKind(IK3_GAUNTLET, 73, 89);
	DropKind(IK3_BOOTS, 73, 89);
	DropKind(IK3_SHIELD, 73, 89);
	DropKind(IK3_BOW, 73, 89);
	DropKind(IK3_YOYO, 73, 89);
	DropKind(IK3_THSWD, 73, 89);
	DropKind(IK3_THAXE, 73, 89);
	
	DropItem(II_GEN_MAT_ELE_DESERT, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_DESERT, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropItem(II_GEN_GEM_GEM_BADTONGUE, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_BADTONGUE, 1000000000, 0, 1);

	DropItem(II_GEN_POT_DRI_VITAL800,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_EIGHTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);
	
	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_ABRAXAS04_1
{
	Maxitem = 2;
	DropGold(560, 812);
	DropKind(IK3_SWD, 73, 89);
	DropKind(IK3_AXE, 73, 89);
	DropKind(IK3_CHEERSTICK, 73, 89);
	DropKind(IK3_KNUCKLEHAMMER, 73, 89);
	DropKind(IK3_WAND, 73, 89);
	DropKind(IK3_STAFF, 73, 89);
	DropKind(IK3_HELMET, 73, 89);
	DropKind(IK3_SUIT, 73, 89);
	DropKind(IK3_GAUNTLET, 73, 89);
	DropKind(IK3_BOOTS, 73, 89);
	DropKind(IK3_SHIELD, 73, 89);
	DropKind(IK3_BOW, 73, 89);
	DropKind(IK3_YOYO, 73, 89);
	DropKind(IK3_THSWD, 73, 89);
	DropKind(IK3_THAXE, 73, 89);	
	DropItem(II_GEN_GEM_GEM_BADTONGUE, 300000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_HAG01
{
	Maxitem = 2;
	DropGold(12, 18);

	DropItem(II_GEN_GEM_GEM_HAGNAIL, 300000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_HAG02
{
	Maxitem = 2;
	DropGold(12, 18);
	
	DropItem(II_GEN_GEM_GEM_HAGNAIL, 300000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_HAG03
{
	Maxitem = 2;
	DropGold(12, 18);
	
	DropItem(II_GEN_GEM_GEM_HAGNAIL, 300000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                    }
		#move
		    {
			
		    }	
   	}               
}


MI_HAG04
{
	Maxitem = 5;
	DropGold(616, 893);

	DropItem(II_WEA_SWO_ANGEL, 2700000, 0, 1);
	DropItem(II_WEA_SWT_ANGEL, 2700000, 0, 1);
	DropItem(II_WEA_AXE_ANGEL, 2700000, 0, 1);
	DropItem(II_WEA_AXT_ANGEL, 2700000, 0, 1);
	DropItem(II_WEA_KNU_ANGEL, 2700000, 0, 1);
	DropItem(II_WEA_CHE_ANGEL, 2700000, 0, 1);
	DropItem(II_WEA_WAN_ANGEL, 2700000, 0, 1);
	DropItem(II_WEA_STA_ANGEL, 2700000, 0, 1);
	DropItem(II_WEA_BOW_ANGEL, 2700000, 0, 1);
	DropItem(II_WEA_YOY_ANGEL, 2700000, 0, 1);

	DropItem(II_GEN_JEW_RIN_STRRING, 4166000, 4, 1);
	DropItem(II_GEN_JEW_RIN_INTRING, 4166000, 4, 1);

	DropKind(IK3_SWD, 80, 95);
	DropKind(IK3_AXE, 80, 95);
	DropKind(IK3_CHEERSTICK, 80, 95);
	DropKind(IK3_KNUCKLEHAMMER, 80, 95);
	DropKind(IK3_WAND, 80, 95);
	DropKind(IK3_STAFF, 80, 95);
	DropKind(IK3_HELMET, 80, 95);
	DropKind(IK3_SUIT, 80, 95);
	DropKind(IK3_GAUNTLET, 80, 95);
	DropKind(IK3_BOOTS, 80, 95);
	DropKind(IK3_SHIELD, 80, 95);
	DropKind(IK3_BOW, 80, 95);
	DropKind(IK3_YOYO, 80, 95);
	DropKind(IK3_THSWD, 80, 95);
	DropKind(IK3_THAXE, 80, 95);

	DropItem(II_GEN_MAT_ELE_RIVER, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_RIVER, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropItem(II_GEN_GEM_GEM_HAGNAIL, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_HAGNAIL, 1000000000, 0, 1);

	DropItem(II_GEN_POT_DRI_VITAL800,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_EIGHTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);
	
	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_HAG04_1
{
	Maxitem = 2;
	DropGold(616, 893);
	DropKind(IK3_SWD, 80, 95);
	DropKind(IK3_AXE, 80, 95);
	DropKind(IK3_CHEERSTICK, 80, 95);
	DropKind(IK3_KNUCKLEHAMMER, 80, 95);
	DropKind(IK3_WAND, 80, 95);
	DropKind(IK3_STAFF, 80, 95);
	DropKind(IK3_HELMET, 80, 95);
	DropKind(IK3_SUIT, 80, 95);
	DropKind(IK3_GAUNTLET, 80, 95);
	DropKind(IK3_BOOTS, 80, 95);
	DropKind(IK3_SHIELD, 80, 95);
	DropKind(IK3_BOW, 80, 95);
	DropKind(IK3_YOYO, 80, 95);
	DropKind(IK3_THSWD, 80, 95);
	DropKind(IK3_THAXE, 80, 95);	
	DropItem(II_GEN_GEM_GEM_HAGNAIL, 300000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_THOTH01
{
	Maxitem = 2;
	DropGold(12, 18);
	
	DropItem(II_GEN_GEM_GEM_THOTHBEAK, 300000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_THOTH02
{
	Maxitem = 2;
	DropGold(12, 18);
	
	DropItem(II_GEN_GEM_GEM_THOTHBEAK, 300000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_THOTH03
{
	Maxitem = 2;
	DropGold(12, 18);

	DropItem(II_GEN_GEM_GEM_THOTHBEAK, 300000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                    }
		#move
		    {
			
		    }	
   	}               
}


MI_THOTH04
{
	Maxitem = 5;
	DropGold(672, 974);

	DropItem(II_WEA_SWO_ANGEL, 3600000, 0, 1);
	DropItem(II_WEA_SWT_ANGEL, 3600000, 0, 1);
	DropItem(II_WEA_AXE_ANGEL, 3600000, 0, 1);
	DropItem(II_WEA_AXT_ANGEL, 3600000, 0, 1);
	DropItem(II_WEA_KNU_ANGEL, 3600000, 0, 1);
	DropItem(II_WEA_CHE_ANGEL, 3600000, 0, 1);
	DropItem(II_WEA_WAN_ANGEL, 3600000, 0, 1);
	DropItem(II_WEA_STA_ANGEL, 3600000, 0, 1);
	DropItem(II_WEA_BOW_ANGEL, 3600000, 0, 1);
	DropItem(II_WEA_YOY_ANGEL, 3600000, 0, 1);

	DropItem(II_GEN_JEW_RIN_STRRING, 4166000, 4, 1);
	DropItem(II_GEN_JEW_RIN_INTRING, 4166000, 4, 1);

	DropKind(IK3_SWD, 90, 101);
	DropKind(IK3_AXE, 90, 101);
	DropKind(IK3_CHEERSTICK, 90, 101);
	DropKind(IK3_KNUCKLEHAMMER, 90, 101);
	DropKind(IK3_WAND, 90, 101);
	DropKind(IK3_STAFF, 90, 101);
	DropKind(IK3_HELMET, 90, 101);
	DropKind(IK3_SUIT, 90, 101);
	DropKind(IK3_GAUNTLET, 90, 101);
	DropKind(IK3_BOOTS, 90, 101);
	DropKind(IK3_SHIELD, 90, 101);
	DropKind(IK3_BOW, 90, 101);
	DropKind(IK3_YOYO, 90, 101);
	DropKind(IK3_THSWD, 90, 101);
	DropKind(IK3_THAXE, 90, 101);

	DropItem(II_GEN_MAT_ELE_CYCLON, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_CYCLON, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropItem(II_GEN_GEM_GEM_THOTHBEAK, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_THOTHBEAK, 1000000000, 0, 1);

	DropItem(II_GEN_POT_DRI_VITAL800,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_EIGHTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);
	
	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_THOTH04_1
{
	Maxitem = 2;
	DropGold(672, 974);

	DropKind(IK3_SWD, 90, 101);
	DropKind(IK3_AXE, 90, 101);
	DropKind(IK3_CHEERSTICK, 90, 101);
	DropKind(IK3_KNUCKLEHAMMER, 90, 101);
	DropKind(IK3_WAND, 90, 101);
	DropKind(IK3_STAFF, 90, 101);
	DropKind(IK3_HELMET, 90, 101);
	DropKind(IK3_SUIT, 90, 101);
	DropKind(IK3_GAUNTLET, 90, 101);
	DropKind(IK3_BOOTS, 90, 101);
	DropKind(IK3_SHIELD, 90, 101);
	DropKind(IK3_BOW, 90, 101);
	DropKind(IK3_YOYO, 90, 101);
	DropKind(IK3_THSWD, 90, 101);
	DropKind(IK3_THAXE, 90, 101);
	
	DropItem(II_GEN_GEM_GEM_THOTHBEAK, 300000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_KHNEMU01
{
	Maxitem = 2;
	DropGold(12, 18);
	
	DropItem(II_GEN_GEM_GEM_KHNEMUCORNU, 300000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_KHNEMU02
{
	Maxitem = 2;
	DropGold(12, 18);
	
	DropItem(II_GEN_GEM_GEM_KHNEMUCORNU, 300000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_KHNEMU03
{
	Maxitem = 2;
	DropGold(12, 18);

	DropItem(II_GEN_GEM_GEM_KHNEMUCORNU, 300000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                    }
		#move
		    {
			
		    }	
   	}               
}


MI_KHNEMU04
{
	Maxitem = 5;
	DropGold(694, 1006);

	DropItem(II_WEA_SWO_ANGEL, 4500000, 0, 1);
	DropItem(II_WEA_SWT_ANGEL, 4500000, 0, 1);
	DropItem(II_WEA_AXE_ANGEL, 4500000, 0, 1);
	DropItem(II_WEA_AXT_ANGEL, 4500000, 0, 1);
	DropItem(II_WEA_KNU_ANGEL, 4500000, 0, 1);
	DropItem(II_WEA_CHE_ANGEL, 4500000, 0, 1);
	DropItem(II_WEA_WAN_ANGEL, 4500000, 0, 1);
	DropItem(II_WEA_STA_ANGEL, 4500000, 0, 1);
	DropItem(II_WEA_BOW_ANGEL, 4500000, 0, 1);
	DropItem(II_WEA_YOY_ANGEL, 4500000, 0, 1);

	DropItem(II_GEN_JEW_RIN_STRRING, 4166000, 4, 1);
	DropItem(II_GEN_JEW_RIN_INTRING, 4166000, 4, 1);

	DropKind(IK3_SWD, 90, 104);
	DropKind(IK3_AXE, 90, 104);
	DropKind(IK3_CHEERSTICK, 90, 104);
	DropKind(IK3_KNUCKLEHAMMER, 90, 104);
	DropKind(IK3_WAND, 90, 104);
	DropKind(IK3_STAFF, 90, 104);
	DropKind(IK3_HELMET, 90, 104);
	DropKind(IK3_SUIT, 90, 104);
	DropKind(IK3_GAUNTLET, 90, 104);
	DropKind(IK3_BOOTS, 90, 104);
	DropKind(IK3_SHIELD, 90, 104);
	DropKind(IK3_BOW, 90, 104);
	DropKind(IK3_YOYO, 90, 104);
	DropKind(IK3_THSWD, 90, 104);
	DropKind(IK3_THAXE, 90, 104);

	DropItem(II_GEN_MAT_ELE_DESERT, 3750000, 0, 1); //�Ӽ� ī��3 0.125%
	DropItem(II_GEN_MAT_ELE_DESERT, 7500000, 0, 1); //�Ӽ� ī��2 0.25%

	DropItem(II_GEN_MAT_ORICHALCUM01, 3006250, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1560000, 0, 1);

	DropItem(II_GEN_GEM_GEM_KHNEMUCORNU, 1000000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_KHNEMUCORNU, 1000000000, 0, 1);

	DropItem(II_GEN_POT_DRI_VITAL800,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_EIGHTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);
	
	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_KHNEMU04_1
{
	Maxitem = 2;
	DropGold(694, 1006);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);		
	DropItem(II_GEN_GEM_GEM_KHNEMUCORNU, 300000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_DANTALIAN01
{
	Maxitem = 2;
	DropGold(12, 18);
	
	DropItem(II_GEN_GEM_GEM_DATALBALL, 300000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_DANTALIAN02
{
	Maxitem = 2;
	DropGold(12, 18);
	
	DropItem(II_GEN_GEM_GEM_DATALBALL, 300000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_DANTALIAN03
{
	Maxitem = 2;
	DropGold(12, 18);
	
	DropItem(II_GEN_GEM_GEM_DATALBALL, 300000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                    }
		#move
		    {
			
		    }	
   	}               
}


MI_DANTALIAN04
{
	Maxitem = 5;
	DropGold(700, 1100);

	DropItem(II_WEA_SWO_LEAGENDG, 3150000, 0, 1);
	DropItem(II_WEA_SWT_LEAGENDG, 3150000, 0, 1);
	DropItem(II_WEA_AXE_LEAGENDG, 3150000, 0, 1);
	DropItem(II_WEA_AXT_LEAGENDG, 3150000, 0, 1);
	DropItem(II_WEA_KNU_LEAGENDG, 3150000, 0, 1);
	DropItem(II_WEA_CHE_LEAGENDG, 3150000, 0, 1);
	DropItem(II_WEA_WAN_LEAGENDG, 3150000, 0, 1);
	DropItem(II_WEA_STA_LEAGENDG, 3150000, 0, 1);
	DropItem(II_WEA_BOW_LEAGENDG, 3150000, 0, 1);
	DropItem(II_WEA_YOY_LEAGENDG, 3150000, 0, 1);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_MAT_ORICHALCUM01, 2455000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1256000, 0, 1);

	DropItem(II_GEN_JEW_NEC_HPNECKLACE, 1500000, 0, -1, 5, 18); //�����Ŭ����+1
	DropItem(II_GEN_JEW_NEC_MPNECKLACE, 1500000, 0, -1, 5, 18); //��Ż��Ŭ����+1
	DropItem(II_GEN_JEW_NEC_FPNECKLACE, 1500000, 1, -1, 5, 18); //���̼ǳ�Ŭ����+1
	DropItem(II_GEN_JEW_NEC_HPNECKLACE, 1500000, 1, -1, 19, 26); //�����Ŭ����+2
	DropItem(II_GEN_JEW_NEC_MPNECKLACE, 1500000, 3, -1, 19, 26); //��Ż��Ŭ����+2
	DropItem(II_GEN_JEW_NEC_FPNECKLACE, 1500000, 4, -1, 19, 26); //���̼ǳ�Ŭ����+2
	DropItem(II_GEN_JEW_NEC_HPNECKLACE, 1500000, 3, -1, 27, 36); //�����Ŭ����+3
	DropItem(II_GEN_JEW_NEC_MPNECKLACE, 1500000, 7, -1, 27, 36); //��Ż��Ŭ����+3
	DropItem(II_GEN_JEW_NEC_FPNECKLACE, 1500000, 7, -1, 19, 26); //���̼ǳ�Ŭ����+3
	DropItem(II_GEN_JEW_RIN_DEXRING, 3000000, 3, 1); // ���+3
	DropItem(II_GEN_JEW_RIN_STARING, 3000000, 3, 1); // ���Ƹ�+3
	DropItem(II_GEN_JEW_RIN_DEXRING, 2500000, 4, 1); // ���+4
	DropItem(II_GEN_JEW_RIN_STARING, 2500000, 4, 1); // ���Ƹ�+4

	DropItem(II_GEN_MAT_ELE_GENERATOR, 	2000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��3 
	DropItem(II_GEN_MAT_ELE_FLAME, 		2000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��3 
	DropItem(II_GEN_MAT_ELE_RIVER, 		2000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��3 
	DropItem(II_GEN_MAT_ELE_CYCLON, 	2000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��3 
	DropItem(II_GEN_MAT_ELE_DESERT, 	2000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��3 
	DropItem(II_GEN_MAT_ELE_GENERATOR, 	5000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��2
	DropItem(II_GEN_MAT_ELE_RIVER, 		5000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��2
	DropItem(II_GEN_MAT_ELE_FLAME, 		5000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��2
	DropItem(II_GEN_MAT_ELE_CYCLON, 		5000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��2
	DropItem(II_GEN_MAT_ELE_DESERT, 		5000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��2

	DropItem(II_GEN_POT_DRI_VITAL800,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_EIGHTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);

	DropItem(II_GEN_GEM_GEM_DATALBALL, 200000000, 0, 1);
	
	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_DANTALIAN04_1
{
	Maxitem = 2;
	DropGold(700, 1100);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);	
	DropItem(II_GEN_GEM_GEM_DATALBALL, 300000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_GANESA01
{
	Maxitem = 2;
	DropGold(12, 18);

	DropItem(II_GEN_GEM_GEM_GANESALVORY, 300000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_GANESA02
{
	Maxitem = 2;
	DropGold(12, 18);
	
	DropItem(II_GEN_GEM_GEM_GANESALVORY, 300000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_GANESA03
{
	Maxitem = 2;
	DropGold(12, 18);
	
	DropItem(II_GEN_GEM_GEM_GANESALVORY, 300000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                    }
		#move
		    {
			
		    }	
   	}               
}


MI_GANESA04
{
	Maxitem = 5;
	DropGold(700, 1100);

	DropItem(II_WEA_SWO_LEAGENDG, 4050000, 0, 1);
	DropItem(II_WEA_SWT_LEAGENDG, 4050000, 0, 1);
	DropItem(II_WEA_AXE_LEAGENDG, 4050000, 0, 1);
	DropItem(II_WEA_AXT_LEAGENDG, 4050000, 0, 1);
	DropItem(II_WEA_KNU_LEAGENDG, 4050000, 0, 1);
	DropItem(II_WEA_CHE_LEAGENDG, 4050000, 0, 1);
	DropItem(II_WEA_WAN_LEAGENDG, 4050000, 0, 1);
	DropItem(II_WEA_STA_LEAGENDG, 4050000, 0, 1);
	DropItem(II_WEA_BOW_LEAGENDG, 4050000, 0, 1);
	DropItem(II_WEA_YOY_LEAGENDG, 4050000, 0, 1);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_MAT_ORICHALCUM01, 2455000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1256000, 0, 1);

	DropItem(II_GEN_JEW_NEC_HPNECKLACE, 3000000, 4, -1, 19, 26); //�����Ŭ����+4
	DropItem(II_GEN_JEW_NEC_MPNECKLACE, 3000000, 11, -1, 19, 26); //��Ż��Ŭ����+4
	DropItem(II_GEN_JEW_NEC_FPNECKLACE, 3000000, 11, -1, 19, 26); //���̼ǳ�Ŭ����+4
	DropItem(II_GEN_JEW_NEC_HPNECKLACE, 1000000, 5, -1, 19, 26); //�����Ŭ����+5
	DropItem(II_GEN_JEW_NEC_MPNECKLACE, 1000000, 15, -1, 19, 26); //��Ż��Ŭ����+5
	DropItem(II_GEN_JEW_NEC_FPNECKLACE, 1000000, 14, -1, 19, 26); //���̼ǳ�Ŭ����+5
	DropItem(II_GEN_JEW_NEC_HPNECKLACE,  500000, 6, -1, 19, 26); //�����Ŭ����+6
	DropItem(II_GEN_JEW_NEC_MPNECKLACE,  500000, 15, -1, 19, 26); //��Ż��Ŭ����+6
	DropItem(II_GEN_JEW_NEC_FPNECKLACE,  500000, 19, -1, 19, 26); //���̼ǳ�Ŭ����+6

	DropItem(II_GEN_MAT_ELE_CANDLE,		 200000, 0, -1, 20, 49 ); 	//HP2% 
	DropItem(II_GEN_MAT_ELE_MAGMA,		 100000, 0, -1, 50, 79 ); 	//HP4% 
	DropItem(II_GEN_MAT_ELE_RAIN,		 200000, 0, -1, 20, 49 ); 	//MP2%
	DropItem(II_GEN_MAT_ELE_FLOOD,		 100000, 0, -1, 50, 79 ); 	//MP4%
	DropItem(II_GEN_MAT_ELE_SPARK,		 200000, 0, -1, 20, 49 ); 	//���ݷ�2%
	DropItem(II_GEN_MAT_ELE_THUNDER,	 100000, 0, -1, 50, 79 ); 	//���ݷ�4%
	DropItem(II_GEN_MAT_ELE_SAND,		 200000, 0, -1, 20, 49 ); 	//����2%
	DropItem(II_GEN_MAT_ELE_MOUNTAIN,	 100000, 0, -1, 50, 79 ); 	//����4%
	DropItem(II_GEN_MAT_ELE_BREEZE,		 200000, 0, -1, 20, 49 ); 	//FP2%
	DropItem(II_GEN_MAT_ELE_STORM,		 100000, 0, -1, 50, 79 ); 	//FP4%

	DropItem(II_GEN_POT_DRI_VITAL800,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_EIGHTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);

	DropItem(II_GEN_GEM_GEM_GANESALVORY, 200000000, 0, 1);
	
	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_GANESA04_1
{
	Maxitem = 2;
	DropGold(700, 1100);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);
	
	DropItem(II_GEN_GEM_GEM_GANESALVORY, 300000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_ASURA01
{
	Maxitem = 2;
	DropGold(12, 18);
	
	DropItem(II_GEN_GEM_GEM_ASURAHEART, 300000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_ASURA02
{
	Maxitem = 2;
	DropGold(12, 18);
	
	DropItem(II_GEN_GEM_GEM_ASURAHEART, 300000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_ASURA03
{
	Maxitem = 2;
	DropGold(12, 18);
	
	DropItem(II_GEN_GEM_GEM_ASURAHEART, 300000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                    }
		#move
		    {
			
		    }	
   	}               
}


MI_ASURA04
{
	Maxitem = 5;
	DropGold(700, 1100);

	DropItem(II_WEA_SWO_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_SWT_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_AXE_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_AXT_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_KNU_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_CHE_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_WAN_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_STA_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_BOW_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_YOY_LEAGENDG, 4500000, 0, 1);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_MAT_ORICHALCUM01, 2455000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1256000, 0, 1);

	DropItem(II_GEN_JEW_RIN_STRRING, 3000000, 4, 1);
	DropItem(II_GEN_JEW_RIN_INTRING, 3000000, 4, 1);
	DropItem(II_GEN_JEW_RIN_DEXRING, 3000000, 4, 1);
	DropItem(II_GEN_JEW_RIN_STARING, 3000000, 4, 1);

	DropItem(II_GEN_JEW_RIN_STRRING, 1000000, 5, 1);
	DropItem(II_GEN_JEW_RIN_INTRING, 1000000, 5, 1);
	DropItem(II_GEN_JEW_RIN_DEXRING, 1000000, 5, 1);
	DropItem(II_GEN_JEW_RIN_STARING, 1000000, 5, 1);

	DropItem(II_GEN_JEW_RIN_STRRING,  500000, 6, 1);
	DropItem(II_GEN_JEW_RIN_INTRING,  500000, 6, 1);
	DropItem(II_GEN_JEW_RIN_DEXRING,  500000, 6, 1);
	DropItem(II_GEN_JEW_RIN_STARING,  500000, 6, 1);

	DropItem(II_GEN_MAT_ELE_GENERATOR, 	2000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��3 
	DropItem(II_GEN_MAT_ELE_FLAME, 		2000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��3 
	DropItem(II_GEN_MAT_ELE_RIVER, 		2000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��3 
	DropItem(II_GEN_MAT_ELE_CYCLON, 	2000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��3 
	DropItem(II_GEN_MAT_ELE_DESERT, 	2000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��3 
	DropItem(II_GEN_MAT_ELE_GENERATOR, 	5000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��2
	DropItem(II_GEN_MAT_ELE_RIVER, 		5000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��2
	DropItem(II_GEN_MAT_ELE_FLAME, 		5000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��2
	DropItem(II_GEN_MAT_ELE_CYCLON, 		5000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��2
	DropItem(II_GEN_MAT_ELE_DESERT, 		5000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��2

	DropItem(II_GEN_MAT_ELE_CANDLE,		 200000, 0, -1, 20, 49 ); 	//HP2% 
	DropItem(II_GEN_MAT_ELE_MAGMA,		 100000, 0, -1, 50, 79 ); 	//HP4% 
	DropItem(II_GEN_MAT_ELE_RAIN,		 200000, 0, -1, 20, 49 ); 	//MP2%
	DropItem(II_GEN_MAT_ELE_FLOOD,		 100000, 0, -1, 50, 79 ); 	//MP4%
	DropItem(II_GEN_MAT_ELE_SPARK,		 200000, 0, -1, 20, 49 ); 	//���ݷ�2%
	DropItem(II_GEN_MAT_ELE_THUNDER,	 100000, 0, -1, 50, 79 ); 	//���ݷ�4%
	DropItem(II_GEN_MAT_ELE_SAND,		 200000, 0, -1, 20, 49 ); 	//����2%
	DropItem(II_GEN_MAT_ELE_MOUNTAIN,	 100000, 0, -1, 50, 79 ); 	//����4%
	DropItem(II_GEN_MAT_ELE_BREEZE,		 200000, 0, -1, 20, 49 ); 	//FP2%
	DropItem(II_GEN_MAT_ELE_STORM,		 100000, 0, -1, 50, 79 ); 	//FP4%

	DropItem(II_GEN_POT_DRI_VITAL800,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_EIGHTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);

	DropItem(II_GEN_GEM_GEM_ASURAHEART, 200000000, 0, 1); 
	
	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_ASURA04_1
{
	Maxitem = 2;
	DropGold(700, 1100);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);
	
	DropItem(II_GEN_GEM_GEM_ASURAHEART, 300000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_IMP01
{
	Maxitem = 2;
        DropGold(20000, 30000);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);
	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                        Rangeattack 6  
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_IMP02
{
	Maxitem = 2;
        DropGold(20000, 30000);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);
	
	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                        Rangeattack 6  
			Summon	40	2	MI_IMP01
                    }
		#move
		    {
			
		    }	
   	}               
}


MI_IMP03
{
	Maxitem = 2;
        DropGold(20000, 30000);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);	
	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                        Rangeattack 6  
			Summon	30	2	MI_IMP02
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_LUCIFER01
{
	Maxitem = 10;
        DropGold(20000, 30000);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);
	
	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                        Rangeattack 10
                        Berserk 10 1.5 
			Summon	20	2	MI_IMP03
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_RANGDA01
{
	Maxitem = 3;
	DropGold(50, 100);
	
	DropItem(II_WEA_SWO_SUHO, 3000000, 0, 1);
	DropItem(II_WEA_SWT_SUHO, 3000000, 0, 1);
	DropItem(II_WEA_AXE_SUHO, 3000000, 0, 1);
	DropItem(II_WEA_AXT_SUHO, 3000000, 0, 1);
	DropItem(II_WEA_KNU_SUHO, 3000000, 0, 1);
	DropItem(II_WEA_CHE_SUHO, 3000000, 0, 1);
	DropItem(II_WEA_WAN_SUHO, 3000000, 0, 1);
	DropItem(II_WEA_STA_SUHO, 3000000, 0, 1);
	DropItem(II_WEA_BOW_SUHO, 3000000, 0, 1);
	DropItem(II_WEA_YOY_SUHO, 3000000, 0, 1);
	DropItem(II_SYS_SYS_SCR_SCRAPTOPAZ, 30000000, 0, 1);
	DropItem(II_SYS_SYS_SCR_SCRAPORICHALCUM, 1470000000, 0, 1);
	DropItem(II_SYS_SYS_SCR_SCRAPMOONSTONE, 1470000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                        Berserk 30 1.5
			recovery 10 50 100 m  
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_RANGDA02
{
	Maxitem = 3;
	DropGold(100, 200);
	
	DropItem(II_WEA_SWO_USU, 3000000, 0, 1);
	DropItem(II_WEA_SWT_USU, 3000000, 0, 1);
	DropItem(II_WEA_AXE_USU, 3000000, 0, 1);
	DropItem(II_WEA_AXT_USU, 3000000, 0, 1);
	DropItem(II_WEA_KNU_USU, 3000000, 0, 1);
	DropItem(II_WEA_CHE_USU, 3000000, 0, 1);
	DropItem(II_WEA_WAN_USU, 3000000, 0, 1);
	DropItem(II_WEA_STA_USU, 3000000, 0, 1);
	DropItem(II_WEA_BOW_USU, 3000000, 0, 1);
	DropItem(II_WEA_YOY_USU, 3000000, 0, 1);
	DropItem(II_SYS_SYS_SCR_SCRAPRUBY, 30000000, 0, 1);
	DropItem(II_SYS_SYS_SCR_SCRAPORICHALCUM, 1470000000, 0, 1);
	DropItem(II_SYS_SYS_SCR_SCRAPMOONSTONE, 1470000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                        Berserk 30 1.5
			recovery 10 50 100 m  
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_RANGDA03
{
	Maxitem = 3;
	DropGold(200, 300);
	
	DropItem(II_WEA_SWO_ANGEL, 3000000, 0, 1);
	DropItem(II_WEA_SWT_ANGEL, 3000000, 0, 1);
	DropItem(II_WEA_AXE_ANGEL, 3000000, 0, 1);
	DropItem(II_WEA_AXT_ANGEL, 3000000, 0, 1);
	DropItem(II_WEA_KNU_ANGEL, 3000000, 0, 1);
	DropItem(II_WEA_CHE_ANGEL, 3000000, 0, 1);
	DropItem(II_WEA_WAN_ANGEL, 3000000, 0, 1);
	DropItem(II_WEA_STA_ANGEL, 3000000, 0, 1);
	DropItem(II_WEA_BOW_ANGEL, 3000000, 0, 1);
	DropItem(II_WEA_YOY_ANGEL, 3000000, 0, 1);
	DropItem(II_SYS_SYS_SCR_SCRAPSAPPHIRE, 30000000, 0, 1);
	DropItem(II_SYS_SYS_SCR_SCRAPORICHALCUM, 1470000000, 0, 1);
	DropItem(II_SYS_SYS_SCR_SCRAPMOONSTONE, 1470000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                        Berserk 30 1.5
			recovery 10 50 100 m  
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_RANGDA04
{
	Maxitem = 3;
	DropGold(300, 400);
	
	DropItem(II_WEA_SWO_LEAGENDG, 3000000, 0, 1);
	DropItem(II_WEA_SWT_LEAGENDG, 3000000, 0, 1);
	DropItem(II_WEA_AXE_LEAGENDG, 3000000, 0, 1);
	DropItem(II_WEA_AXT_LEAGENDG, 3000000, 0, 1);
	DropItem(II_WEA_KNU_LEAGENDG, 3000000, 0, 1);
	DropItem(II_WEA_CHE_LEAGENDG, 3000000, 0, 1);
	DropItem(II_WEA_WAN_LEAGENDG, 3000000, 0, 1);
	DropItem(II_WEA_STA_LEAGENDG, 3000000, 0, 1);
	DropItem(II_WEA_BOW_LEAGENDG, 3000000, 0, 1);
	DropItem(II_WEA_YOY_LEAGENDG, 3000000, 0, 1);
	DropItem(II_SYS_SYS_SCR_SCRAPEMERALD, 30000000, 0, 1);
	DropItem(II_SYS_SYS_SCR_SCRAPORICHALCUM, 1470000000, 0, 1);
	DropItem(II_SYS_SYS_SCR_SCRAPMOONSTONE, 1470000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                        Berserk 30 1.5
			recovery 10 50 100 m  
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_KINGSTER01
{
	Maxitem = 3;
	DropGold(50, 100);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_GIANTFORCEPS, 300000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_KINGSTER02
{
	Maxitem = 3;
	DropGold(100, 200);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_GIANTFORCEPS, 300000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_KINGSTER03
{
	Maxitem = 3;
	DropGold(200, 300);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_GIANTFORCEPS, 300000000, 0, 1);



	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_KRAKEN01
{
	Maxitem = 3;
	DropGold(50, 100);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_INKSAC, 300000000, 0, 1);


	
	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_KRAKEN02
{
	Maxitem = 3;
	DropGold(100, 200);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_INKSAC, 300000000, 0, 1);



	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_KRAKEN03
{
	Maxitem = 3;
	DropGold(200, 300);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_INKSAC, 300000000, 0, 1);


	
	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_CREPER01
{
	Maxitem = 3;
	DropGold(50, 100);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_CARAPACE, 300000000, 0, 1);



	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_CREPER02
{
	Maxitem = 3;
	DropGold(100, 200);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_CARAPACE, 300000000, 0, 1);



	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_CREPER03
{
	Maxitem = 3;
	DropGold(200, 300);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_CARAPACE, 300000000, 0, 1);



	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_NAGA01
{
	Maxitem = 3;
	DropGold(50, 100);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_CRISPHAIR, 300000000, 0, 1);



	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_NAGA02
{
	Maxitem = 3;
	DropGold(100, 200);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_CRISPHAIR, 300000000, 0, 1);



	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_NAGA03
{
	Maxitem = 3;
	DropGold(200, 300);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_CRISPHAIR, 300000000, 0, 1);



	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_ATROX01
{
	Maxitem = 3;
	DropGold(50, 100);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_BROKENWINGS, 300000000, 0, 1);



	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_ATROX02
{
	Maxitem = 3;
	DropGold(100, 200);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_BROKENWINGS, 300000000, 0, 1);



	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_ATROX03
{
	Maxitem = 3;
	DropGold(200, 300);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_BROKENWINGS, 300000000, 0, 1);



	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_OKEAN01
{
	Maxitem = 3;
	DropGold(50, 100);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_CROWN, 300000000, 0, 1);



	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_OKEAN02
{
	Maxitem = 3;
	DropGold(100, 200);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_CROWN, 300000000, 0, 1);



	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_OKEAN03
{
	Maxitem = 3;
	DropGold(200, 300);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_CROWN, 300000000, 0, 1);



	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_TAIGA01
{
	Maxitem = 3;
	DropGold(50, 100);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_CANINETOOTH, 300000000, 0, 1);



	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_TAIGA02
{
	Maxitem = 3;
	DropGold(100, 200);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_CANINETOOTH, 300000000, 0, 1);



	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_TAIGA03
{
	Maxitem = 3;
	DropGold(200, 300);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_CANINETOOTH, 300000000, 0, 1);



	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_DORIAN01
{
	Maxitem = 3;
	DropGold(50, 100);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_SHARPTOOTH, 300000000, 0, 1);



	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_DORIAN02
{
	Maxitem = 3;
	DropGold(100, 200);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_SHARPTOOTH, 300000000, 0, 1);



	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_DORIAN03
{
	Maxitem = 3;
	DropGold(200, 300);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_SHARPTOOTH, 300000000, 0, 1);



	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_MEREL01
{
	Maxitem = 3;
	DropGold(50, 100);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_GOGGLOO, 300000000, 0, 1);



	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_MEREL02
{
	Maxitem = 3;
	DropGold(100, 200);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_GOGGLOO, 300000000, 0, 1);



	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                    }
		#move
		    {
			
		    }	
   	}               
}

MI_MEREL03
{
	Maxitem = 3;
	DropGold(200, 300);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_GOGGLOO, 300000000, 0, 1);



	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 
                    }
		#move
		    {
			
		    }	
   	}               
}


MI_Crohell01
{
	Maxitem = 2;
        DropGold(500, 2000);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_DOGTOOTH, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 2.0
                    }
		#move
		    {
			
		    }	
   	}                
}

MI_Crohell02
{
	Maxitem = 2;
        DropGold(500, 2000);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_DOGTOOTH, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 2.0
                    }
		#move
		    {
			
		    }	
   	}                
}

MI_Crohell03
{
	Maxitem = 2;
        DropGold(500, 2000);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_DOGTOOTH, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 2.0
                    }
		#move
		    {
			
		    }	
   	}                
}

MI_Crohell04
{
	Maxitem = 4;
	DropGold(700, 1100);

	DropItem(II_WEA_SWO_LEAGENDG, 3000000, 0, 1);
	DropItem(II_WEA_SWT_LEAGENDG, 3000000, 0, 1);
	DropItem(II_WEA_AXE_LEAGENDG, 3000000, 0, 1);
	DropItem(II_WEA_AXT_LEAGENDG, 3000000, 0, 1);
	DropItem(II_WEA_KNU_LEAGENDG, 3000000, 0, 1);
	DropItem(II_WEA_CHE_LEAGENDG, 3000000, 0, 1);
	DropItem(II_WEA_WAN_LEAGENDG, 3000000, 0, 1);
	DropItem(II_WEA_STA_LEAGENDG, 3000000, 0, 1);
	DropItem(II_WEA_BOW_LEAGENDG, 3000000, 0, 1);
	DropItem(II_WEA_YOY_LEAGENDG, 3000000, 0, 1);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_MAT_ORICHALCUM01, 2455000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1256000, 0, 1);

	DropItem(II_GEN_MAT_ELE_GENERATOR, 	2000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��3 
	DropItem(II_GEN_MAT_ELE_FLAME, 		2000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��3 
	DropItem(II_GEN_MAT_ELE_RIVER, 		2000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��3 
	DropItem(II_GEN_MAT_ELE_CYCLON, 	2000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��3 
	DropItem(II_GEN_MAT_ELE_DESERT, 	2000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��3 
	DropItem(II_GEN_MAT_ELE_GENERATOR, 	5000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��2
	DropItem(II_GEN_MAT_ELE_RIVER, 		5000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��2
	DropItem(II_GEN_MAT_ELE_FLAME, 		5000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��2
	DropItem(II_GEN_MAT_ELE_CYCLON, 		5000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��2
	DropItem(II_GEN_MAT_ELE_DESERT, 		5000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��2

	DropItem(II_GEN_MAT_ELE_CANDLE,		 200000, 0, -1, 20, 49 ); 	//HP2% 
	DropItem(II_GEN_MAT_ELE_MAGMA,		 100000, 0, -1, 50, 79 ); 	//HP4% 
	DropItem(II_GEN_MAT_ELE_RAIN,		 200000, 0, -1, 20, 49 ); 	//MP2%
	DropItem(II_GEN_MAT_ELE_FLOOD,		 100000, 0, -1, 50, 79 ); 	//MP4%
	DropItem(II_GEN_MAT_ELE_SPARK,		 200000, 0, -1, 20, 49 ); 	//���ݷ�2%
	DropItem(II_GEN_MAT_ELE_THUNDER,	 100000, 0, -1, 50, 79 ); 	//���ݷ�4%
	DropItem(II_GEN_MAT_ELE_SAND,		 200000, 0, -1, 20, 49 ); 	//����2%
	DropItem(II_GEN_MAT_ELE_MOUNTAIN,	 100000, 0, -1, 50, 79 ); 	//����4%
	DropItem(II_GEN_MAT_ELE_BREEZE,		 200000, 0, -1, 20, 49 ); 	//FP2%
	DropItem(II_GEN_MAT_ELE_STORM,		 100000, 0, -1, 50, 79 ); 	//FP4%

	DropItem(II_GEN_POT_DRI_VITAL800,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_EIGHTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);

	DropItem(II_GEN_GEM_GEM_DOGTOOTH, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 3.0
                    }
		#move
		    {
			
		    }	
   	}                
}

MI_Frinker01
{
	Maxitem = 2;
	DropGold(99, 143);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_FLOWER, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 2.0
                    }
		#move
		    {
			
		    }	
   	}                
}

MI_Frinker02
{
	Maxitem = 2;
	DropGold(99, 143);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_FLOWER, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 2.0
                    }
		#move
		    {
			
		    }	
   	}                
}

MI_Frinker03
{
	Maxitem = 2;
	DropGold(99, 143);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_FLOWER, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 2.0
                    }
		#move
		    {
			
		    }	
   	}                
}

MI_Frinker04
{
	Maxitem = 4;
	DropGold(700, 1100);

	DropItem(II_WEA_SWO_LEAGENDG, 3000000, 0, 1);
	DropItem(II_WEA_SWT_LEAGENDG, 3000000, 0, 1);
	DropItem(II_WEA_AXE_LEAGENDG, 3000000, 0, 1);
	DropItem(II_WEA_AXT_LEAGENDG, 3000000, 0, 1);
	DropItem(II_WEA_KNU_LEAGENDG, 3000000, 0, 1);
	DropItem(II_WEA_CHE_LEAGENDG, 3000000, 0, 1);
	DropItem(II_WEA_WAN_LEAGENDG, 3000000, 0, 1);
	DropItem(II_WEA_STA_LEAGENDG, 3000000, 0, 1);
	DropItem(II_WEA_BOW_LEAGENDG, 3000000, 0, 1);
	DropItem(II_WEA_YOY_LEAGENDG, 3000000, 0, 1);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_MAT_ORICHALCUM01, 2455000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1256000, 0, 1);

	DropItem(II_GEN_MAT_ELE_GENERATOR, 	2000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��3 
	DropItem(II_GEN_MAT_ELE_FLAME, 		2000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��3 
	DropItem(II_GEN_MAT_ELE_RIVER, 		2000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��3 
	DropItem(II_GEN_MAT_ELE_CYCLON, 	2000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��3 
	DropItem(II_GEN_MAT_ELE_DESERT, 	2000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��3 
	DropItem(II_GEN_MAT_ELE_GENERATOR, 	5000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��2
	DropItem(II_GEN_MAT_ELE_RIVER, 		5000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��2
	DropItem(II_GEN_MAT_ELE_FLAME, 		5000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��2
	DropItem(II_GEN_MAT_ELE_CYCLON, 		5000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��2
	DropItem(II_GEN_MAT_ELE_DESERT, 		5000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��2

	DropItem(II_GEN_MAT_ELE_CANDLE,		 200000, 0, -1, 20, 49 ); 	//HP2% 
	DropItem(II_GEN_MAT_ELE_MAGMA,		 100000, 0, -1, 50, 79 ); 	//HP4% 
	DropItem(II_GEN_MAT_ELE_RAIN,		 200000, 0, -1, 20, 49 ); 	//MP2%
	DropItem(II_GEN_MAT_ELE_FLOOD,		 100000, 0, -1, 50, 79 ); 	//MP4%
	DropItem(II_GEN_MAT_ELE_SPARK,		 200000, 0, -1, 20, 49 ); 	//���ݷ�2%
	DropItem(II_GEN_MAT_ELE_THUNDER,	 100000, 0, -1, 50, 79 ); 	//���ݷ�4%
	DropItem(II_GEN_MAT_ELE_SAND,		 200000, 0, -1, 20, 49 ); 	//����2%
	DropItem(II_GEN_MAT_ELE_MOUNTAIN,	 100000, 0, -1, 50, 79 ); 	//����4%
	DropItem(II_GEN_MAT_ELE_BREEZE,		 200000, 0, -1, 20, 49 ); 	//FP2%
	DropItem(II_GEN_MAT_ELE_STORM,		 100000, 0, -1, 50, 79 ); 	//FP4%

	DropItem(II_GEN_POT_DRI_VITAL800,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_EIGHTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);

	DropItem(II_GEN_GEM_GEM_FLOWER, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 3.0
                    }
		#move
		    {
			
		    }	
   	}                
}

MI_Toadrin01
{
	Maxitem = 2;
	DropGold(99, 143);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_POISONBAG, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 2.0
                    }
		#move
		    {
			
		    }	
   	}                
}

MI_Toadrin02
{
	Maxitem = 2;
	DropGold(100, 145);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_POISONBAG, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 2.0
                    }
		#move
		    {
			
		    }	
   	}                
}

MI_Toadrin03
{
	Maxitem = 2;
	DropGold(99, 143);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_POISONBAG, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 2.0
                    }
		#move
		    {
			
		    }	
   	}                
}

MI_Toadrin04
{
	Maxitem = 4;
	DropGold(700, 1100);

	DropItem(II_WEA_SWO_LEAGENDG, 2000000, 0, 1);
	DropItem(II_WEA_SWT_LEAGENDG, 2000000, 0, 1);
	DropItem(II_WEA_AXE_LEAGENDG, 2000000, 0, 1);
	DropItem(II_WEA_AXT_LEAGENDG, 2000000, 0, 1);
	DropItem(II_WEA_KNU_LEAGENDG, 2000000, 0, 1);
	DropItem(II_WEA_CHE_LEAGENDG, 2000000, 0, 1);
	DropItem(II_WEA_WAN_LEAGENDG, 2000000, 0, 1);
	DropItem(II_WEA_STA_LEAGENDG, 2000000, 0, 1);
	DropItem(II_WEA_BOW_LEAGENDG, 2000000, 0, 1);
	DropItem(II_WEA_YOY_LEAGENDG, 2000000, 0, 1);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_MAT_ORICHALCUM01, 2455000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1256000, 0, 1);

	DropItem(II_GEN_MAT_ELE_GENERATOR, 	2000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��3 
	DropItem(II_GEN_MAT_ELE_FLAME, 		2000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��3 
	DropItem(II_GEN_MAT_ELE_RIVER, 		2000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��3 
	DropItem(II_GEN_MAT_ELE_CYCLON, 	2000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��3 
	DropItem(II_GEN_MAT_ELE_DESERT, 	2000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��3 
	DropItem(II_GEN_MAT_ELE_GENERATOR, 	5000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��2
	DropItem(II_GEN_MAT_ELE_RIVER, 		5000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��2
	DropItem(II_GEN_MAT_ELE_FLAME, 		5000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��2
	DropItem(II_GEN_MAT_ELE_CYCLON, 		5000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��2
	DropItem(II_GEN_MAT_ELE_DESERT, 		5000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��2

	DropItem(II_GEN_POT_DRI_VITAL800,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_EIGHTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);

	DropItem(II_GEN_GEM_GEM_POISONBAG, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 3.0
                    }
		#move
		    {
			
		    }	
   	}                
}

MI_Hatsalra01
{
	Maxitem = 2;
	DropGold(99, 143);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_NECKLACE, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 2.0
                    }
		#move
		    {
			
		    }	
   	}                
}

MI_Hatsalra02
{
	Maxitem = 2;
	DropGold(99, 143);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_NECKLACE, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 2.0
                    }
		#move
		    {
			
		    }	
   	}                
}

MI_Hatsalra03
{
	Maxitem = 2;
	DropGold(99, 143);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_NECKLACE, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 2.0
                    }
		#move
		    {
			
		    }	
   	}                
}


MI_Hatsalra04
{
	Maxitem = 4;
	DropGold(700, 1100);

	DropItem(II_WEA_SWO_LEAGENDG, 3000000, 0, 1);
	DropItem(II_WEA_SWT_LEAGENDG, 3000000, 0, 1);
	DropItem(II_WEA_AXE_LEAGENDG, 3000000, 0, 1);
	DropItem(II_WEA_AXT_LEAGENDG, 3000000, 0, 1);
	DropItem(II_WEA_KNU_LEAGENDG, 3000000, 0, 1);
	DropItem(II_WEA_CHE_LEAGENDG, 3000000, 0, 1);
	DropItem(II_WEA_WAN_LEAGENDG, 3000000, 0, 1);
	DropItem(II_WEA_STA_LEAGENDG, 3000000, 0, 1);
	DropItem(II_WEA_BOW_LEAGENDG, 3000000, 0, 1);
	DropItem(II_WEA_YOY_LEAGENDG, 3000000, 0, 1);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_MAT_ORICHALCUM01, 2455000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1256000, 0, 1);

	DropItem(II_GEN_MAT_ELE_CANDLE,		 200000, 0, -1, 20, 49 ); 	//HP2% 
	DropItem(II_GEN_MAT_ELE_MAGMA,		 100000, 0, -1, 50, 79 ); 	//HP4% 
	DropItem(II_GEN_MAT_ELE_RAIN,		 200000, 0, -1, 20, 49 ); 	//MP2%
	DropItem(II_GEN_MAT_ELE_FLOOD,		 100000, 0, -1, 50, 79 ); 	//MP4%
	DropItem(II_GEN_MAT_ELE_SPARK,		 200000, 0, -1, 20, 49 ); 	//���ݷ�2%
	DropItem(II_GEN_MAT_ELE_THUNDER,	 100000, 0, -1, 50, 79 ); 	//���ݷ�4%
	DropItem(II_GEN_MAT_ELE_SAND,		 200000, 0, -1, 20, 49 ); 	//����2%
	DropItem(II_GEN_MAT_ELE_MOUNTAIN,	 100000, 0, -1, 50, 79 ); 	//����4%
	DropItem(II_GEN_MAT_ELE_BREEZE,		 200000, 0, -1, 20, 49 ); 	//FP2%
	DropItem(II_GEN_MAT_ELE_STORM,		 100000, 0, -1, 50, 79 ); 	//FP4%

	DropItem(II_GEN_POT_DRI_VITAL800,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_EIGHTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);

	DropItem(II_GEN_GEM_GEM_NECKLACE, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 3.0
                    }
		#move
		    {
			
		    }	
   	}                
}


MI_Berken01
{
	Maxitem = 2;
	DropGold(99, 143);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_BLAD, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 2.0
                    }
		#move
		    {
			
		    }	
   	}                
}

MI_Berken02
{
	Maxitem = 2;
	DropGold(99, 143);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_BLAD, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 2.0
                    }
		#move
		    {
			
		    }	
   	}                
}

MI_Berken03
{
	Maxitem = 2;
	DropGold(99, 143);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_BLAD, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 2.5
                    }
		#move
		    {
			
		    }	
   	}                
}

MI_Berken04
{
	Maxitem = 4;
	DropGold(700, 1100);

	DropItem(II_WEA_SWO_LEAGENDG, 2500000, 0, 1);
	DropItem(II_WEA_SWT_LEAGENDG, 2500000, 0, 1);
	DropItem(II_WEA_AXE_LEAGENDG, 2500000, 0, 1);
	DropItem(II_WEA_AXT_LEAGENDG, 2500000, 0, 1);
	DropItem(II_WEA_KNU_LEAGENDG, 2500000, 0, 1);
	DropItem(II_WEA_CHE_LEAGENDG, 2500000, 0, 1);
	DropItem(II_WEA_WAN_LEAGENDG, 2500000, 0, 1);
	DropItem(II_WEA_STA_LEAGENDG, 2500000, 0, 1);	
	DropItem(II_WEA_BOW_LEAGENDG, 2500000, 0, 1);
	DropItem(II_WEA_YOY_LEAGENDG, 2500000, 0, 1);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_MAT_ORICHALCUM01, 2455000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1256000, 0, 1);

	DropItem(II_GEN_MAT_ELE_GENERATOR, 	2000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��3 
	DropItem(II_GEN_MAT_ELE_FLAME, 		2000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��3 
	DropItem(II_GEN_MAT_ELE_RIVER, 		2000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��3 
	DropItem(II_GEN_MAT_ELE_CYCLON, 	2000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��3 
	DropItem(II_GEN_MAT_ELE_DESERT, 	2000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��3 
	DropItem(II_GEN_MAT_ELE_GENERATOR, 	5000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��2
	DropItem(II_GEN_MAT_ELE_RIVER, 		5000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��2
	DropItem(II_GEN_MAT_ELE_FLAME, 		5000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��2
	DropItem(II_GEN_MAT_ELE_CYCLON, 		5000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��2
	DropItem(II_GEN_MAT_ELE_DESERT, 		5000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��2

	DropItem(II_GEN_POT_DRI_VITAL800,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_EIGHTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);

	DropItem(II_GEN_GEM_GEM_BLAD, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 3.0
                    }
		#move
		    {
			
		    }	
   	}                
}

MI_PRICKANT01
{
	Maxitem = 2;
        DropGold(500, 2000);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	
	DropItem(II_GEN_GEM_GEM_ANTEGG, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 2.5
                    }
		#move
		    {
			
		    }	
   	}                
}

MI_PRICKANT02
{
	Maxitem = 2;
        DropGold(500, 2000);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_ANTEGG, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 2.5
                    }
		#move
		    {
			
		    }	
   	}                
}

MI_PRICKANT03
{
	Maxitem = 2;
        DropGold(500, 2000);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_ANTEGG, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 2.5
                    }
		#move
		    {
			
		    }	
   	}                
}

MI_PRICKANT04
{
	Maxitem = 4;
	DropGold(700, 1100);

	DropItem(II_WEA_SWO_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_SWT_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_AXE_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_AXT_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_KNU_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_CHE_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_WAN_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_STA_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_BOW_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_YOY_LEAGENDG, 4500000, 0, 1);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_MAT_ORICHALCUM01, 2455000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1256000, 0, 1);
	DropItem(II_GEN_GEM_GEM_ANTEGG, 200000000, 0, 1);
	

	DropItem(II_GEN_MAT_ELE_GENERATOR, 	2000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��3 
	DropItem(II_GEN_MAT_ELE_FLAME, 		2000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��3 
	DropItem(II_GEN_MAT_ELE_RIVER, 		2000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��3 
	DropItem(II_GEN_MAT_ELE_CYCLON, 	2000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��3 
	DropItem(II_GEN_MAT_ELE_DESERT, 	2000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��3 
	DropItem(II_GEN_MAT_ELE_GENERATOR, 	5000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��2
	DropItem(II_GEN_MAT_ELE_RIVER, 		5000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��2
	DropItem(II_GEN_MAT_ELE_FLAME, 		5000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��2
	DropItem(II_GEN_MAT_ELE_CYCLON, 		5000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��2
	DropItem(II_GEN_MAT_ELE_DESERT, 		5000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��2

	DropItem(II_GEN_MAT_ELE_CANDLE,		 200000, 0, -1, 20, 49 ); 	//HP2% 
	DropItem(II_GEN_MAT_ELE_MAGMA,		 100000, 0, -1, 50, 79 ); 	//HP4% 
	DropItem(II_GEN_MAT_ELE_RAIN,		 200000, 0, -1, 20, 49 ); 	//MP2%
	DropItem(II_GEN_MAT_ELE_FLOOD,		 100000, 0, -1, 50, 79 ); 	//MP4%
	DropItem(II_GEN_MAT_ELE_SPARK,		 200000, 0, -1, 20, 49 ); 	//���ݷ�2%
	DropItem(II_GEN_MAT_ELE_THUNDER,	 100000, 0, -1, 50, 79 ); 	//���ݷ�4%
	DropItem(II_GEN_MAT_ELE_SAND,		 200000, 0, -1, 20, 49 ); 	//����2%
	DropItem(II_GEN_MAT_ELE_MOUNTAIN,	 100000, 0, -1, 50, 79 ); 	//����4%
	DropItem(II_GEN_MAT_ELE_BREEZE,		 200000, 0, -1, 20, 49 ); 	//FP2%
	DropItem(II_GEN_MAT_ELE_STORM,		 100000, 0, -1, 50, 79 ); 	//FP4%

	DropItem(II_GEN_POT_DRI_VITAL800,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_EIGHTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 2.5
                    }
		#move
		    {
			
		    }	
   	}                
}


MI_CRIPESCENTIPEDE01
{
	Maxitem = 2;
        DropGold(500, 2000);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_OILLEG, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 2.5
                    }
		#move
		    {
			
		    }	
   	}                
}

MI_CRIPESCENTIPEDE02
{
	Maxitem = 2;
        DropGold(500, 2000);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_OILLEG, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 2.5
                    }
		#move
		    {
			
		    }	
   	}                
}

MI_CRIPESCENTIPEDE03
{
	Maxitem = 2;
        DropGold(500, 2000);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_OILLEG, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 2.5
                    }
		#move
		    {
			
		    }	
   	}                
}

MI_CRIPESCENTIPEDE04
{
	Maxitem = 4;
	DropGold(700, 1100);

	DropItem(II_WEA_SWO_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_SWT_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_AXE_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_AXT_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_KNU_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_CHE_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_WAN_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_STA_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_BOW_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_YOY_LEAGENDG, 4500000, 0, 1);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_MAT_ORICHALCUM01, 2455000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1256000, 0, 1);
	DropItem(II_GEN_GEM_GEM_OILLEG, 200000000, 0, 1);

	DropItem(II_GEN_MAT_ELE_GENERATOR, 	2000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��3 
	DropItem(II_GEN_MAT_ELE_FLAME, 		2000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��3 
	DropItem(II_GEN_MAT_ELE_RIVER, 		2000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��3 
	DropItem(II_GEN_MAT_ELE_CYCLON, 	2000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��3 
	DropItem(II_GEN_MAT_ELE_DESERT, 	2000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��3 
	DropItem(II_GEN_MAT_ELE_GENERATOR, 	5000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��2
	DropItem(II_GEN_MAT_ELE_RIVER, 		5000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��2
	DropItem(II_GEN_MAT_ELE_FLAME, 		5000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��2
	DropItem(II_GEN_MAT_ELE_CYCLON, 		5000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��2
	DropItem(II_GEN_MAT_ELE_DESERT, 		5000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��2

	DropItem(II_GEN_MAT_ELE_CANDLE,		 200000, 0, -1, 20, 49 ); 	//HP2% 
	DropItem(II_GEN_MAT_ELE_MAGMA,		 100000, 0, -1, 50, 79 ); 	//HP4% 
	DropItem(II_GEN_MAT_ELE_RAIN,		 200000, 0, -1, 20, 49 ); 	//MP2%
	DropItem(II_GEN_MAT_ELE_FLOOD,		 100000, 0, -1, 50, 79 ); 	//MP4%
	DropItem(II_GEN_MAT_ELE_SPARK,		 200000, 0, -1, 20, 49 ); 	//���ݷ�2%
	DropItem(II_GEN_MAT_ELE_THUNDER,	 100000, 0, -1, 50, 79 ); 	//���ݷ�4%
	DropItem(II_GEN_MAT_ELE_SAND,		 200000, 0, -1, 20, 49 ); 	//����2%
	DropItem(II_GEN_MAT_ELE_MOUNTAIN,	 100000, 0, -1, 50, 79 ); 	//����4%
	DropItem(II_GEN_MAT_ELE_BREEZE,		 200000, 0, -1, 20, 49 ); 	//FP2%
	DropItem(II_GEN_MAT_ELE_STORM,		 100000, 0, -1, 50, 79 ); 	//FP4%

	DropItem(II_GEN_POT_DRI_VITAL800,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_EIGHTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 2.5
                    }
		#move
		    {
			
		    }	
   	}                
}


MI_MAULMOUSE01
{
	Maxitem = 2;
        DropGold(500, 2000);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_NICECHEESE, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 2.5
                    }
		#move
		    {
			
		    }	
   	}                
}

MI_MAULMOUSE02
{
	Maxitem = 2;
        DropGold(500, 2000);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_NICECHEESE, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 2.5
                    }
		#move
		    {
			
		    }	
   	}                
}

MI_MAULMOUSE03
{
	Maxitem = 2;
        DropGold(500, 2000);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_NICECHEESE, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 2.5
                    }
		#move
		    {
			
		    }	
   	}                
}

MI_MAULMOUSE04
{
	Maxitem = 4;
	DropGold(700, 1100);

	DropItem(II_WEA_SWO_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_SWT_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_AXE_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_AXT_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_KNU_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_CHE_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_WAN_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_STA_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_BOW_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_YOY_LEAGENDG, 4500000, 0, 1);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_MAT_ORICHALCUM01, 2455000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1256000, 0, 1);
	DropItem(II_GEN_GEM_GEM_NICECHEESE, 200000000, 0, 1);

	DropItem(II_GEN_MAT_ELE_GENERATOR, 	2000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��3 
	DropItem(II_GEN_MAT_ELE_FLAME, 		2000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��3 
	DropItem(II_GEN_MAT_ELE_RIVER, 		2000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��3 
	DropItem(II_GEN_MAT_ELE_CYCLON, 	2000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��3 
	DropItem(II_GEN_MAT_ELE_DESERT, 	2000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��3 
	DropItem(II_GEN_MAT_ELE_GENERATOR, 	5000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��2
	DropItem(II_GEN_MAT_ELE_RIVER, 		5000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��2
	DropItem(II_GEN_MAT_ELE_FLAME, 		5000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��2
	DropItem(II_GEN_MAT_ELE_CYCLON, 		5000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��2
	DropItem(II_GEN_MAT_ELE_DESERT, 		5000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��2

	DropItem(II_GEN_MAT_ELE_CANDLE,		 200000, 0, -1, 20, 49 ); 	//HP2% 
	DropItem(II_GEN_MAT_ELE_MAGMA,		 100000, 0, -1, 50, 79 ); 	//HP4% 
	DropItem(II_GEN_MAT_ELE_RAIN,		 200000, 0, -1, 20, 49 ); 	//MP2%
	DropItem(II_GEN_MAT_ELE_FLOOD,		 100000, 0, -1, 50, 79 ); 	//MP4%
	DropItem(II_GEN_MAT_ELE_SPARK,		 200000, 0, -1, 20, 49 ); 	//���ݷ�2%
	DropItem(II_GEN_MAT_ELE_THUNDER,	 100000, 0, -1, 50, 79 ); 	//���ݷ�4%
	DropItem(II_GEN_MAT_ELE_SAND,		 200000, 0, -1, 20, 49 ); 	//����2%
	DropItem(II_GEN_MAT_ELE_MOUNTAIN,	 100000, 0, -1, 50, 79 ); 	//����4%
	DropItem(II_GEN_MAT_ELE_BREEZE,		 200000, 0, -1, 20, 49 ); 	//FP2%
	DropItem(II_GEN_MAT_ELE_STORM,		 100000, 0, -1, 50, 79 ); 	//FP4%

	DropItem(II_GEN_POT_DRI_VITAL800,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_EIGHTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 2.5
                    }
		#move
		    {
			
		    }	
   	}                
}


MI_LYCANOS01
{
	Maxitem = 4;
	DropGold(99, 143);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_BIGTOENAIL, 210000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_BIGTOENAIL, 210000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_BIGTOENAIL, 210000000, 0, 1);

	DropItem(II_SYS_SYS_EVE_OMINOUSGIFTBOX01, 300000000, 0, 1);
	DropItem(II_SYS_SYS_EVE_OMINOUSGIFTBOX02, 300000000, 0, 1);
	DropItem(II_SYS_SYS_EVE_OMINOUSGIFTBOX03, 300000000, 0, 1);

	DropItem(II_GEN_MAT_ELE_LIGHTING, 30000000, 0, 1);
	DropItem(II_GEN_MAT_ELE_VOLCANO, 30000000, 0, 1);
	DropItem(II_GEN_MAT_ELE_EARTHQUAKE, 30000000, 0, 1);
	DropItem(II_GEN_MAT_ELE_OCEAN, 30000000, 0, 1);
	DropItem(II_GEN_MAT_ELE_VACCUM, 30000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 2.5
                    }
		#move
		    {
			
		    }	
   	}                
}

MI_VEMPAIN01
{
	Maxitem = 6;
        DropGold(20000, 30000);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_MAT_DIAMOND, 21000000, 0, 1);
	DropItem(II_GEN_MAT_DIAMOND, 21000000, 0, 1);
	DropItem(II_GEN_MAT_DIAMOND, 21000000, 0, 1);
	DropItem(II_GEN_MAT_DIAMOND, 21000000, 0, 1);
	DropItem(II_GEN_MAT_DIAMOND, 21000000, 0, 1);
	DropItem(II_GEN_MAT_EMERALD, 27000000, 0, 1);
	DropItem(II_GEN_MAT_EMERALD, 27000000, 0, 1);
	DropItem(II_GEN_MAT_EMERALD, 27000000, 0, 1);
	DropItem(II_GEN_MAT_EMERALD, 27000000, 0, 1);
	DropItem(II_GEN_MAT_EMERALD, 27000000, 0, 1);
	DropItem(II_GEN_MAT_SAPPHIRE, 36000000, 0, 1);
	DropItem(II_GEN_MAT_SAPPHIRE, 36000000, 0, 1);
	DropItem(II_GEN_MAT_SAPPHIRE, 36000000, 0, 1);
	DropItem(II_GEN_MAT_SAPPHIRE, 36000000, 0, 1);
	DropItem(II_GEN_MAT_SAPPHIRE, 36000000, 0, 1);
	DropItem(II_GEN_MAT_RUBY, 48000000, 0, 1);
	DropItem(II_GEN_MAT_RUBY, 48000000, 0, 1);
	DropItem(II_GEN_MAT_RUBY, 48000000, 0, 1);
	DropItem(II_GEN_MAT_RUBY, 48000000, 0, 1);
	DropItem(II_GEN_MAT_RUBY, 48000000, 0, 1);
	DropItem(II_GEN_MAT_TOPAZ, 63000000, 0, 1);
	DropItem(II_GEN_MAT_TOPAZ, 63000000, 0, 1);
	DropItem(II_GEN_MAT_TOPAZ, 63000000, 0, 1);
	DropItem(II_GEN_MAT_TOPAZ, 63000000, 0, 1);
	DropItem(II_GEN_MAT_TOPAZ, 63000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 180000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 180000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 180000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 180000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 180000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 180000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 180000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 180000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 180000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 180000000, 0, 1);

	DropItem(II_SYS_SYS_EVE_OMINOUSGIFTBOX01, 600000000, 0, 1);
	DropItem(II_SYS_SYS_EVE_OMINOUSGIFTBOX02, 600000000, 0, 1);
	DropItem(II_SYS_SYS_EVE_OMINOUSGIFTBOX03, 600000000, 0, 1);

	DropItem(II_WEA_SWO_VEMPIRE, 9000000, 0, 1);
	DropItem(II_WEA_SWT_VEMPIRE, 9000000, 0, 1);
	DropItem(II_WEA_AXE_VEMPIRE, 9000000, 0, 1);
	DropItem(II_WEA_AXT_VEMPIRE, 9000000, 0, 1);
	DropItem(II_WEA_KNU_VEMPIRE, 9000000, 0, 1);
	DropItem(II_WEA_CHE_VEMPIRE, 9000000, 0, 1);
	DropItem(II_WEA_WAN_VEMPIRE, 9000000, 0, 1);
	DropItem(II_WEA_STA_VEMPIRE, 9000000, 0, 1);
	DropItem(II_WEA_BOW_VEMPIRE, 9000000, 0, 1);
	DropItem(II_WEA_YOY_VEMPIRE, 9000000, 0, 1);

	DropItem(II_GEN_MAT_ELE_CANDLEA, 6000000, 0, 1);
	DropItem(II_GEN_MAT_ELE_RAINATKA, 6000000, 0, 1);
	DropItem(II_GEN_MAT_ELE_SPARKATKA, 6000000, 0, 1);
	DropItem(II_GEN_MAT_ELE_BREEZEATKA, 6000000, 0, 1);
	DropItem(II_GEN_MAT_ELE_SANDATKA, 6000000, 0, 1);

        DropItem(II_GEN_JEW_RIN_INTRING, 6000000, 18, 1);
	DropItem(II_GEN_JEW_RIN_DEXRING, 6000000, 18, 1);
	DropItem(II_GEN_JEW_RIN_STRRING, 6000000, 18, 1);

	DropItem(II_GEN_GEM_GEM_VEMPIREGLASS, 210000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_VEMPIREGLASS, 210000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_VEMPIREGLASS, 210000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                        Rangeattack 10
			Berserk 20 3.0
                    }
		#move
		    {
			
		    }	
   	}                
}


MI_PRICKANT01_1
{
	Maxitem = 2;
	DropGold(99, 143);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_CURSEANTEGG, 200000000, 0, 1);

	m_nAttackFirstRange = 10;


	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 2.5
                    }
		#move
		    {
			
		    }	
   	}                
}

MI_PRICKANT02_1
{
	Maxitem = 2;
	DropGold(99, 143);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_CURSEANTEGG, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 2.5
                    }
		#move
		    {
			
		    }	
   	}                
}

MI_PRICKANT03_1
{
	Maxitem = 2;
	DropGold(99, 143);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_CURSEANTEGG, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 2.5
                    }
		#move
		    {
			
		    }	
   	}                
}

MI_PRICKANT04_1
{
	Maxitem = 5;
	DropGold(700, 1100);

	DropItem(II_WEA_SWO_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_SWT_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_AXE_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_AXT_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_KNU_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_CHE_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_WAN_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_STA_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_BOW_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_YOY_LEAGENDG, 4500000, 0, 1);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_MAT_ORICHALCUM01, 2455000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1256000, 0, 1);

	DropItem(II_GEN_JEW_RIN_STRRING, 3000000, 4, 1);
	DropItem(II_GEN_JEW_RIN_INTRING, 3000000, 4, 1);
	DropItem(II_GEN_JEW_RIN_DEXRING, 3000000, 4, 1);
	DropItem(II_GEN_JEW_RIN_STARING, 3000000, 4, 1);

	DropItem(II_GEN_JEW_RIN_STRRING, 1000000, 5, 1);
	DropItem(II_GEN_JEW_RIN_INTRING, 1000000, 5, 1);
	DropItem(II_GEN_JEW_RIN_DEXRING, 1000000, 5, 1);
	DropItem(II_GEN_JEW_RIN_STARING, 1000000, 5, 1);

	DropItem(II_GEN_JEW_RIN_STRRING,  500000, 6, 1);
	DropItem(II_GEN_JEW_RIN_INTRING,  500000, 6, 1);
	DropItem(II_GEN_JEW_RIN_DEXRING,  500000, 6, 1);
	DropItem(II_GEN_JEW_RIN_STARING,  500000, 6, 1);

	DropItem(II_GEN_MAT_ELE_GENERATOR, 	2000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��3 
	DropItem(II_GEN_MAT_ELE_FLAME, 		2000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��3 
	DropItem(II_GEN_MAT_ELE_RIVER, 		2000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��3 
	DropItem(II_GEN_MAT_ELE_CYCLON, 	2000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��3 
	DropItem(II_GEN_MAT_ELE_DESERT, 	2000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��3 
	DropItem(II_GEN_MAT_ELE_GENERATOR, 	5000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��2
	DropItem(II_GEN_MAT_ELE_RIVER, 		5000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��2
	DropItem(II_GEN_MAT_ELE_FLAME, 		5000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��2
	DropItem(II_GEN_MAT_ELE_CYCLON, 		5000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��2
	DropItem(II_GEN_MAT_ELE_DESERT, 		5000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��2

	DropItem(II_GEN_MAT_ELE_CANDLE,		 200000, 0, -1, 20, 49 ); 	//HP2% 
	DropItem(II_GEN_MAT_ELE_MAGMA,		 100000, 0, -1, 50, 79 ); 	//HP4% 
	DropItem(II_GEN_MAT_ELE_RAIN,		 200000, 0, -1, 20, 49 ); 	//MP2%
	DropItem(II_GEN_MAT_ELE_FLOOD,		 100000, 0, -1, 50, 79 ); 	//MP4%
	DropItem(II_GEN_MAT_ELE_SPARK,		 200000, 0, -1, 20, 49 ); 	//���ݷ�2%
	DropItem(II_GEN_MAT_ELE_THUNDER,	 100000, 0, -1, 50, 79 ); 	//���ݷ�4%
	DropItem(II_GEN_MAT_ELE_SAND,		 200000, 0, -1, 20, 49 ); 	//����2%
	DropItem(II_GEN_MAT_ELE_MOUNTAIN,	 100000, 0, -1, 50, 79 ); 	//����4%
	DropItem(II_GEN_MAT_ELE_BREEZE,		 200000, 0, -1, 20, 49 ); 	//FP2%
	DropItem(II_GEN_MAT_ELE_STORM,		 100000, 0, -1, 50, 79 ); 	//FP4%

	DropItem(II_GEN_POT_DRI_VITAL800,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_EIGHTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);
	DropItem(II_GEN_GEM_GEM_CURSEANTEGG, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 2.5
                    }
		#move
		    {
			
		    }	
   	}                
}


MI_CRIPESCENTIPEDE01_1
{
	Maxitem = 2;
	DropGold(99, 143);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_CURSEOILLEG, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 2.5
                    }
		#move
		    {
			
		    }	
   	}                
}

MI_CRIPESCENTIPEDE02_1
{
	Maxitem = 2;
	DropGold(99, 143);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);
	
	DropItem(II_GEN_GEM_GEM_CURSEOILLEG, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 2.5
                    }
		#move
		    {
			
		    }	
   	}                
}

MI_CRIPESCENTIPEDE03_1
{
	Maxitem = 2;
	DropGold(99, 143);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_CURSEOILLEG, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 2.5
                    }
		#move
		    {
			
		    }	
   	}                
}

MI_CRIPESCENTIPEDE04_1
{
	Maxitem = 5;
	DropGold(700, 1100);

	DropItem(II_WEA_SWO_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_SWT_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_AXE_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_AXT_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_KNU_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_CHE_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_WAN_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_STA_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_BOW_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_YOY_LEAGENDG, 4500000, 0, 1);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_MAT_ORICHALCUM01, 2455000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1256000, 0, 1);

	DropItem(II_GEN_JEW_RIN_STRRING, 3000000, 4, 1);
	DropItem(II_GEN_JEW_RIN_INTRING, 3000000, 4, 1);
	DropItem(II_GEN_JEW_RIN_DEXRING, 3000000, 4, 1);
	DropItem(II_GEN_JEW_RIN_STARING, 3000000, 4, 1);

	DropItem(II_GEN_JEW_RIN_STRRING, 1000000, 5, 1);
	DropItem(II_GEN_JEW_RIN_INTRING, 1000000, 5, 1);
	DropItem(II_GEN_JEW_RIN_DEXRING, 1000000, 5, 1);
	DropItem(II_GEN_JEW_RIN_STARING, 1000000, 5, 1);

	DropItem(II_GEN_JEW_RIN_STRRING,  500000, 6, 1);
	DropItem(II_GEN_JEW_RIN_INTRING,  500000, 6, 1);
	DropItem(II_GEN_JEW_RIN_DEXRING,  500000, 6, 1);
	DropItem(II_GEN_JEW_RIN_STARING,  500000, 6, 1);

	DropItem(II_GEN_MAT_ELE_GENERATOR, 	2000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��3 
	DropItem(II_GEN_MAT_ELE_FLAME, 		2000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��3 
	DropItem(II_GEN_MAT_ELE_RIVER, 		2000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��3 
	DropItem(II_GEN_MAT_ELE_CYCLON, 	2000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��3 
	DropItem(II_GEN_MAT_ELE_DESERT, 	2000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��3 
	DropItem(II_GEN_MAT_ELE_GENERATOR, 	5000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��2
	DropItem(II_GEN_MAT_ELE_RIVER, 		5000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��2
	DropItem(II_GEN_MAT_ELE_FLAME, 		5000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��2
	DropItem(II_GEN_MAT_ELE_CYCLON, 		5000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��2
	DropItem(II_GEN_MAT_ELE_DESERT, 		5000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��2

	DropItem(II_GEN_MAT_ELE_CANDLE,		 200000, 0, -1, 20, 49 ); 	//HP2% 
	DropItem(II_GEN_MAT_ELE_MAGMA,		 100000, 0, -1, 50, 79 ); 	//HP4% 
	DropItem(II_GEN_MAT_ELE_RAIN,		 200000, 0, -1, 20, 49 ); 	//MP2%
	DropItem(II_GEN_MAT_ELE_FLOOD,		 100000, 0, -1, 50, 79 ); 	//MP4%
	DropItem(II_GEN_MAT_ELE_SPARK,		 200000, 0, -1, 20, 49 ); 	//���ݷ�2%
	DropItem(II_GEN_MAT_ELE_THUNDER,	 100000, 0, -1, 50, 79 ); 	//���ݷ�4%
	DropItem(II_GEN_MAT_ELE_SAND,		 200000, 0, -1, 20, 49 ); 	//����2%
	DropItem(II_GEN_MAT_ELE_MOUNTAIN,	 100000, 0, -1, 50, 79 ); 	//����4%
	DropItem(II_GEN_MAT_ELE_BREEZE,		 200000, 0, -1, 20, 49 ); 	//FP2%
	DropItem(II_GEN_MAT_ELE_STORM,		 100000, 0, -1, 50, 79 ); 	//FP4%

	DropItem(II_GEN_POT_DRI_VITAL800,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_EIGHTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);

	DropItem(II_GEN_GEM_GEM_CURSEOILLEG, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 2.5
                    }
		#move
		    {
			
		    }	
   	}                
}


MI_MAULMOUSE01_1
{
	Maxitem = 2;
	DropGold(99, 143);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_CURSENICECHEESE, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 2.5
                    }
		#move
		    {
			
		    }	
   	}                
}

MI_MAULMOUSE02_1
{
	Maxitem = 2;
	DropGold(99, 143);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_CURSENICECHEESE, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 2.5
                    }
		#move
		    {
			
		    }	
   	}                
}

MI_MAULMOUSE03_1
{
	Maxitem = 2;
	DropGold(99, 143);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_CURSENICECHEESE, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 2.5
                    }
		#move
		    {
			
		    }	
   	}                
}

MI_MAULMOUSE04_1
{
	Maxitem = 5;
	DropGold(700, 1100);

	DropItem(II_WEA_SWO_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_SWT_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_AXE_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_AXT_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_KNU_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_CHE_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_WAN_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_STA_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_BOW_LEAGENDG, 4500000, 0, 1);
	DropItem(II_WEA_YOY_LEAGENDG, 4500000, 0, 1);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_MAT_ORICHALCUM01, 2455000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 1256000, 0, 1);

	DropItem(II_GEN_JEW_RIN_STRRING, 3000000, 4, 1);
	DropItem(II_GEN_JEW_RIN_INTRING, 3000000, 4, 1);
	DropItem(II_GEN_JEW_RIN_DEXRING, 3000000, 4, 1);
	DropItem(II_GEN_JEW_RIN_STARING, 3000000, 4, 1);

	DropItem(II_GEN_JEW_RIN_STRRING, 1000000, 5, 1);
	DropItem(II_GEN_JEW_RIN_INTRING, 1000000, 5, 1);
	DropItem(II_GEN_JEW_RIN_DEXRING, 1000000, 5, 1);
	DropItem(II_GEN_JEW_RIN_STARING, 1000000, 5, 1);

	DropItem(II_GEN_JEW_RIN_STRRING,  500000, 6, 1);
	DropItem(II_GEN_JEW_RIN_INTRING,  500000, 6, 1);
	DropItem(II_GEN_JEW_RIN_DEXRING,  500000, 6, 1);
	DropItem(II_GEN_JEW_RIN_STARING,  500000, 6, 1);

	DropItem(II_GEN_MAT_ELE_GENERATOR, 	2000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��3 
	DropItem(II_GEN_MAT_ELE_FLAME, 		2000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��3 
	DropItem(II_GEN_MAT_ELE_RIVER, 		2000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��3 
	DropItem(II_GEN_MAT_ELE_CYCLON, 	2000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��3 
	DropItem(II_GEN_MAT_ELE_DESERT, 	2000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��3 
	DropItem(II_GEN_MAT_ELE_GENERATOR, 	5000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��2
	DropItem(II_GEN_MAT_ELE_RIVER, 		5000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��2
	DropItem(II_GEN_MAT_ELE_FLAME, 		5000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��2
	DropItem(II_GEN_MAT_ELE_CYCLON, 		5000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��2
	DropItem(II_GEN_MAT_ELE_DESERT, 		5000000, 0, -1, 20, 130 ); 	//�Ӽ� ī��2

	DropItem(II_GEN_MAT_ELE_CANDLE,		 200000, 0, -1, 20, 49 ); 	//HP2% 
	DropItem(II_GEN_MAT_ELE_MAGMA,		 100000, 0, -1, 50, 79 ); 	//HP4% 
	DropItem(II_GEN_MAT_ELE_RAIN,		 200000, 0, -1, 20, 49 ); 	//MP2%
	DropItem(II_GEN_MAT_ELE_FLOOD,		 100000, 0, -1, 50, 79 ); 	//MP4%
	DropItem(II_GEN_MAT_ELE_SPARK,		 200000, 0, -1, 20, 49 ); 	//���ݷ�2%
	DropItem(II_GEN_MAT_ELE_THUNDER,	 100000, 0, -1, 50, 79 ); 	//���ݷ�4%
	DropItem(II_GEN_MAT_ELE_SAND,		 200000, 0, -1, 20, 49 ); 	//����2%
	DropItem(II_GEN_MAT_ELE_MOUNTAIN,	 100000, 0, -1, 50, 79 ); 	//����4%
	DropItem(II_GEN_MAT_ELE_BREEZE,		 200000, 0, -1, 20, 49 ); 	//FP2%
	DropItem(II_GEN_MAT_ELE_STORM,		 100000, 0, -1, 50, 79 ); 	//FP4%

	DropItem(II_GEN_POT_DRI_VITAL800,  110000000, 0, 1);
	DropItem(II_GEN_REF_REF_EIGHTH, 420000000, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_COO_MEATSALAD, 1000000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);
	DropItem(II_GEN_FOO_ICE_ICECREAMCAKE, 600000001, 0, 1);

	DropItem(II_GEN_GEM_GEM_CURSENICECHEESE, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 2.5
                    }
		#move
		    {
			
		    }	
   	}                
}


MI_LYCANOS01_1
{
	Maxitem = 6;
	DropGold(99, 143);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_CURSEBIGTOENAIL, 210000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_CURSEBIGTOENAIL, 210000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_CURSEBIGTOENAIL, 210000000, 0, 1);

	DropItem(II_SYS_SYS_EVE_OMINOUSGIFTBOX01, 450000000, 0, 1);
	DropItem(II_SYS_SYS_EVE_OMINOUSGIFTBOX02, 450000000, 0, 1);
	DropItem(II_SYS_SYS_EVE_OMINOUSGIFTBOX03, 450000000, 0, 1);

	DropItem(II_GEN_MAT_ELE_LIGHTING, 30000000, 0, 1);
	DropItem(II_GEN_MAT_ELE_VOLCANO, 30000000, 0, 1);
	DropItem(II_GEN_MAT_ELE_EARTHQUAKE, 30000000, 0, 1);
	DropItem(II_GEN_MAT_ELE_OCEAN, 30000000, 0, 1);
	DropItem(II_GEN_MAT_ELE_VACCUM, 30000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 2.5
                    }
		#move
		    {
			
		    }	
   	}                
}

MI_VEMPAIN01_1
{
	Maxitem = 8;	

        DropGold(20000, 30000);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_MAT_DIAMOND, 21000000, 0, 1);
	DropItem(II_GEN_MAT_DIAMOND, 21000000, 0, 1);
	DropItem(II_GEN_MAT_DIAMOND, 21000000, 0, 1);
	DropItem(II_GEN_MAT_DIAMOND, 21000000, 0, 1);
	DropItem(II_GEN_MAT_DIAMOND, 21000000, 0, 1);
	DropItem(II_GEN_MAT_EMERALD, 27000000, 0, 1);
	DropItem(II_GEN_MAT_EMERALD, 27000000, 0, 1);
	DropItem(II_GEN_MAT_EMERALD, 27000000, 0, 1);
	DropItem(II_GEN_MAT_EMERALD, 27000000, 0, 1);
	DropItem(II_GEN_MAT_EMERALD, 27000000, 0, 1);
	DropItem(II_GEN_MAT_SAPPHIRE, 36000000, 0, 1);
	DropItem(II_GEN_MAT_SAPPHIRE, 36000000, 0, 1);
	DropItem(II_GEN_MAT_SAPPHIRE, 36000000, 0, 1);
	DropItem(II_GEN_MAT_SAPPHIRE, 36000000, 0, 1);
	DropItem(II_GEN_MAT_SAPPHIRE, 36000000, 0, 1);
	DropItem(II_GEN_MAT_RUBY, 48000000, 0, 1);
	DropItem(II_GEN_MAT_RUBY, 48000000, 0, 1);
	DropItem(II_GEN_MAT_RUBY, 48000000, 0, 1);
	DropItem(II_GEN_MAT_RUBY, 48000000, 0, 1);
	DropItem(II_GEN_MAT_RUBY, 48000000, 0, 1);
	DropItem(II_GEN_MAT_TOPAZ, 63000000, 0, 1);
	DropItem(II_GEN_MAT_TOPAZ, 63000000, 0, 1);
	DropItem(II_GEN_MAT_TOPAZ, 63000000, 0, 1);
	DropItem(II_GEN_MAT_TOPAZ, 63000000, 0, 1);
	DropItem(II_GEN_MAT_TOPAZ, 63000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 180000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 180000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 180000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 180000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 180000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 180000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 180000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 180000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 180000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 180000000, 0, 1);
	DropItem(II_WEA_SWO_ANCIENT, 9000000, 0, 1);
	DropItem(II_WEA_SWT_ANCIENT, 9000000, 0, 1);
	DropItem(II_WEA_AXE_ANCIENT, 9000000, 0, 1);
	DropItem(II_WEA_AXT_ANCIENT, 9000000, 0, 1);
	DropItem(II_WEA_KNU_ANCIENT, 9000000, 0, 1);
	DropItem(II_WEA_CHE_ANCIENT, 9000000, 0, 1);
	DropItem(II_WEA_WAN_ANCIENT, 9000000, 0, 1);
	DropItem(II_WEA_STA_ANCIENT, 9000000, 0, 1);
	DropItem(II_WEA_BOW_ANCIENT, 9000000, 0, 1);
	DropItem(II_WEA_YOY_ANCIENT, 9000000, 0, 1);

        DropItem(II_GEN_JEW_RIN_INTRING, 6000000, 18, 1);
	DropItem(II_GEN_JEW_RIN_DEXRING, 6000000, 18, 1);
	DropItem(II_GEN_JEW_RIN_STRRING, 6000000, 18, 1);

	DropItem(II_GEN_MAT_ELE_CANDLEA, 6000000, 0, 1);
	DropItem(II_GEN_MAT_ELE_RAINATKA, 6000000, 0, 1);
	DropItem(II_GEN_MAT_ELE_SPARKATKA, 6000000, 0, 1);
	DropItem(II_GEN_MAT_ELE_BREEZEATKA, 6000000, 0, 1);
	DropItem(II_GEN_MAT_ELE_SANDATKA, 6000000, 0, 1);

	DropItem(II_GEN_JEW_RIN_FIRERING, 9000000, 0, 1)
	DropItem(II_GEN_JEW_RIN_LANDRING, 9000000, 0, 1)
	DropItem(II_GEN_JEW_RIN_WATERRING, 9000000, 0, 1)
	DropItem(II_GEN_JEW_RIN_ELECTRICRING, 9000000, 0, 1)
	DropItem(II_GEN_JEW_EAR_ATTEARRINGEST, 9000000, 0, 1)
	DropItem(II_GEN_JEW_EAR_DEFEARRINGEST, 9000000, 0, 1)
	DropItem(II_GEN_JEW_NEC_HPNECKLACEMR, 9000000, 0, 1)
	DropItem(II_GEN_JEW_NEC_MPNECKLACEMR, 9000000, 0, 1)
	DropItem(II_GEN_JEW_NEC_FPNECKLACEMR, 9000000, 0, 1)
	DropItem(II_GEN_JEW_NEC_HPMPNECKLACE, 9000000, 0, 1)
	DropItem(II_GEN_JEW_EAR_MAGICRINGEST, 9000000, 0, 1)
	DropItem(II_GEN_JEW_EAR_RANGERINGEST, 9000000, 0, 1)

	DropItem(II_SYS_SYS_EVE_OMINOUSGIFTBOX01, 900000000, 0, 1);
	DropItem(II_SYS_SYS_EVE_OMINOUSGIFTBOX02, 900000000, 0, 1);
	DropItem(II_SYS_SYS_EVE_OMINOUSGIFTBOX03, 900000000, 0, 1);

	DropItem(II_GEN_GEM_GEM_CURSEVEMPIREGLASS, 210000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_CURSEVEMPIREGLASS, 210000000, 0, 1);
	DropItem(II_GEN_GEM_GEM_CURSEVEMPIREGLASS, 210000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                        Rangeattack 10
			Berserk 20 3.0
                    }
		#move
		    {
			
		    }	
   	}                
}

MI_MOCOMOCHI1
{
	Maxitem = 8;	
	DropItem(II_ARM_S_CLO_HAT_NPCEVENT02, 15000000, 0, 1);
	DropItem(II_ARM_S_CLO_HAT_NPCEVENT03, 15000000, 0, 1);
	DropItem(II_ARM_S_CLO_HAT_NPCEVENT04, 15000000, 0, 1);
	DropItem(II_SYS_SYS_SCR_BXSPECIALHOOD01, 157500000, 0, 1);
	DropItem(II_SYS_SYS_SCR_BXSPECIALFUN01, 157500000, 0, 1);
	DropItem(II_GEN_WARP_COUPLERING, 450000000, 0, 1);
	DropItem(II_CHR_MAG_TRI_ROCKETBOMB, 900000000, 0, 1);
	DropItem(II_GEN_MAG_TRI_HWFIREWORKS, 900000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
                        Rangeattack 10
			Berserk 20 3.0
                    }
		#move
		    {
			
		    }	
   	}                
}

//15�� ����
MI_SKELWOLF
{
	Maxitem = 2;
	DropGold(99, 143);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_WOLFTOOTH, 200000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Berserk 20 2.0
                    }
		#move
		    {
			
		    }	
   	}                
}

MI_SKELSWORD
{
	Maxitem = 2;
	DropGold(99, 143);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_SKELSKIN, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 2.0
                    }
		#move
		    {
			
		    }	
   	}                
}

MI_SKELSPEAR
{
	Maxitem = 2;
	DropGold(99, 143);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_SKELPIECE, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 2.0
                    }
		#move
		    {
			
		    }	
   	}                
}

MI_SKELMAGE
{
	Maxitem = 2;
	DropGold(99, 143);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_SKELSTAFFPIECE, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			keeprangeattack 6
			Berserk 20 2.0
                    }
		#move
		    {
			
		    }	
   	}                
}

MI_SKELASSASSIN
{
	Maxitem = 2;
	DropGold(99, 143);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_SKELWEAPIECE, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 2.0
                    }
		#move
		    {
			
		    }	
   	}                
}

MI_SKELFIGHTER
{
	Maxitem = 2;
	DropGold(99, 143);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_SKELTOOLBOX, 200000000, 0, 1);
	

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack
			Berserk 20 2.0
                    }
		#move
		    {
			
		    }	
   	}                
}

MI_SKELGENERAL
{
	Maxitem = 8;
	DropGold(99, 143);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_SYS_VIS_LV3_WARRIOR, 21000000, 0, 1);
	DropItem(II_SYS_VIS_LV3_KNIGHT, 21000000, 0, 1);
	DropItem(II_SYS_VIS_LV3_BUBBLE 21000000, 0, 1);
	DropItem(II_SYS_VIS_LV3_IBLIS, 21000000, 0, 1);
	DropItem(II_SYS_VIS_LV3_SHADE, 21000000, 0, 1);

	DropItem(II_GEN_MAT_DIAMOND, 21000000, 0, 1);
	DropItem(II_GEN_MAT_DIAMOND, 21000000, 0, 1);
	DropItem(II_GEN_MAT_DIAMOND, 21000000, 0, 1);
	DropItem(II_GEN_MAT_DIAMOND, 21000000, 0, 1);
	DropItem(II_GEN_MAT_DIAMOND, 21000000, 0, 1);
	DropItem(II_GEN_MAT_EMERALD, 27000000, 0, 1);
	DropItem(II_GEN_MAT_EMERALD, 27000000, 0, 1);
	DropItem(II_GEN_MAT_EMERALD, 27000000, 0, 1);
	DropItem(II_GEN_MAT_EMERALD, 27000000, 0, 1);
	DropItem(II_GEN_MAT_EMERALD, 27000000, 0, 1);
	DropItem(II_GEN_MAT_SAPPHIRE, 36000000, 0, 1);
	DropItem(II_GEN_MAT_SAPPHIRE, 36000000, 0, 1);
	DropItem(II_GEN_MAT_SAPPHIRE, 36000000, 0, 1);
	DropItem(II_GEN_MAT_SAPPHIRE, 36000000, 0, 1);
	DropItem(II_GEN_MAT_SAPPHIRE, 36000000, 0, 1);
	DropItem(II_GEN_MAT_RUBY, 48000000, 0, 1);
	DropItem(II_GEN_MAT_RUBY, 48000000, 0, 1);
	DropItem(II_GEN_MAT_RUBY, 48000000, 0, 1);
	DropItem(II_GEN_MAT_RUBY, 48000000, 0, 1);
	DropItem(II_GEN_MAT_RUBY, 48000000, 0, 1);
	DropItem(II_GEN_MAT_TOPAZ, 63000000, 0, 1);
	DropItem(II_GEN_MAT_TOPAZ, 63000000, 0, 1);
	DropItem(II_GEN_MAT_TOPAZ, 63000000, 0, 1);
	DropItem(II_GEN_MAT_TOPAZ, 63000000, 0, 1);
	DropItem(II_GEN_MAT_TOPAZ, 63000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 180000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 180000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 180000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 180000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 180000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 180000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 180000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 180000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 180000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 180000000, 0, 1);

        DropItem(II_GEN_JEW_RIN_INTRING, 6000000, 18, 1);
	DropItem(II_GEN_JEW_RIN_DEXRING, 6000000, 18, 1);
	DropItem(II_GEN_JEW_RIN_STRRING, 6000000, 18, 1);

	DropItem(II_GEN_MAT_ELE_CANDLEA, 6000000, 0, 1);
	DropItem(II_GEN_MAT_ELE_RAINATKA, 6000000, 0, 1);
	DropItem(II_GEN_MAT_ELE_SPARKATKA, 6000000, 0, 1);
	DropItem(II_GEN_MAT_ELE_BREEZEATKA, 6000000, 0, 1);
	DropItem(II_GEN_MAT_ELE_SANDATKA, 6000000, 0, 1);

	DropItem(II_GEN_MAT_ELE_LIGHTING, 30000000, 0, 1);
	DropItem(II_GEN_MAT_ELE_VOLCANO, 30000000, 0, 1);
	DropItem(II_GEN_MAT_ELE_EARTHQUAKE, 30000000, 0, 1);
	DropItem(II_GEN_MAT_ELE_OCEAN, 30000000, 0, 1);
	DropItem(II_GEN_MAT_ELE_VACCUM, 30000000, 0, 1);

	DropItem(II_GEN_JEW_RIN_FIRERING, 9000000, 0, 1)
	DropItem(II_GEN_JEW_RIN_LANDRING, 9000000, 0, 1)
	DropItem(II_GEN_JEW_RIN_WATERRING, 9000000, 0, 1)
	DropItem(II_GEN_JEW_RIN_ELECTRICRING, 9000000, 0, 1)
	DropItem(II_GEN_JEW_EAR_ATTEARRINGEST, 9000000, 0, 1)
	DropItem(II_GEN_JEW_EAR_DEFEARRINGEST, 9000000, 0, 1)
	DropItem(II_GEN_JEW_NEC_HPNECKLACEMR, 9000000, 0, 1)
	DropItem(II_GEN_JEW_NEC_MPNECKLACEMR, 9000000, 0, 1)
	DropItem(II_GEN_JEW_NEC_FPNECKLACEMR, 9000000, 0, 1)
	DropItem(II_GEN_JEW_NEC_HPMPNECKLACE, 9000000, 0, 1)
	DropItem(II_GEN_JEW_EAR_MAGICRINGEST, 9000000, 0, 1)
	DropItem(II_GEN_JEW_EAR_RANGERINGEST, 9000000, 0, 1)

	DropItem(II_GEN_GEM_GEM_SKELGENERALPIECE, 200000000, 0, 1);

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 20 cunning sam
                        Rangeattack 10
			Berserk 20 2.0
                    }
		#move
		    {
			
		    }	
   	}                
}

MI_SKELGRIFFIN
{
	Maxitem = 2;
	DropGold(99, 143);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_GRIFFINFEATHER, 200000000, 0, 1);	


	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 10 cunning sam
			Berserk 20 2.0
                    }
		#move
		    {
			
		    }	
   	}                
}

MI_SKELLEADER
{
	Maxitem = 2;
	DropGold(99, 143);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_BACKBONELEADER, 200000000, 0, 1);
	

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 10 cunning sam
			Berserk 20 2.0
                    }
		#move
		    {
			
		    }	
   	}                
}

MI_SKELSPAIN
{
	Maxitem = 2;
	DropGold(99, 143);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_BACKBONESPAIN, 200000000, 0, 1);
	

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 10 cunning sam
			Berserk 20 2.0
                    }
		#move
		    {
			
		    }	
   	}                
}

MI_SKELSHAMEN
{
	Maxitem = 2;
	DropGold(99, 143);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_MAGICBOOK, 200000000, 0, 1);
	

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 10 cunning sam
			Berserk 20 2.0
			Keeprangeattack 6
                    }
		#move
		    {
			
		    }	
   	}                
}

MI_SKELRIDER
{
	Maxitem = 2;
	DropGold(99, 143);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_GEN_GEM_GEM_DARKBEAD, 200000000, 0, 1);
	

	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 10 cunning sam
			Berserk 20 2.0
			rangeattack 6
                    }
		#move
		    {
			
		    }	
   	}                
}

MI_SKELDEVIL
{
	Maxitem = 8;
	DropGold(99, 143);

	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	DropKind(IK3_THSWD, 6, 6);
	DropKind(IK3_THAXE, 6, 6);

	DropItem(II_ARM_M_KIN_HELMET_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_M_KIN_SUIT_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_M_KIN_GAUNTLET_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_M_KIN_BOOTS_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_F_KIN_HELMET_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_F_KIN_SUIT_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_F_KIN_GAUNTLET_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_F_KIN_BOOTS_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_M_BLA_HELMET_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_M_BLA_SUIT_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_M_BLA_GAUNTLET_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_M_BLA_BOOTS_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_F_BLA_HELMET_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_F_BLA_SUIT_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_F_BLA_GAUNTLET_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_F_BLA_BOOTS_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_M_JST_HELMET_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_M_JST_SUIT_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_M_JST_GAUNTLET_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_M_JST_BOOTS_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_F_JST_HELMET_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_F_JST_SUIT_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_F_JST_GAUNTLET_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_F_JST_BOOTS_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_M_RAG_HELMET_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_M_RAG_SUIT_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_M_RAG_GAUNTLET_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_M_RAG_BOOTS_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_F_RAG_HELMET_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_F_RAG_SUIT_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_F_RAG_GAUNTLET_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_F_RAG_BOOTS_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_M_RIN_HELMET_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_M_RIN_SUIT_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_M_RIN_GAUNTLET_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_M_RIN_BOOTS_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_F_RIN_HELMET_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_F_RIN_SUIT_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_F_RIN_GAUNTLET_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_F_RIN_BOOTS_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_M_BIL_HELMET_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_M_BIL_SUIT_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_M_BIL_GAUNTLET_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_M_BIL_BOOTS_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_F_BIL_HELMET_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_F_BIL_SUIT_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_F_BIL_GAUNTLET_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_F_BIL_BOOTS_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_M_PSY_HELMET_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_M_PSY_SUIT_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_M_PSY_GAUNTLET_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_M_PSY_BOOTS_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_F_PSY_HELMET_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_F_PSY_SUIT_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_F_PSY_GAUNTLET_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_F_PSY_BOOTS_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_M_ELE_HELMET_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_M_ELE_SUIT_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_M_ELE_GAUNTLET_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_M_ELE_BOOTS_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_F_ELE_HELMET_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_F_ELE_SUIT_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_F_ELE_GAUNTLET_SET_34 , 900000, 0, 1);
	DropItem(II_ARM_F_ELE_BOOTS_SET_34 , 900000, 0, 1);

	DropItem(II_SYS_VIS_LV3_WARRIOR, 21000000, 0, 1);
	DropItem(II_SYS_VIS_LV3_KNIGHT, 21000000, 0, 1);
	DropItem(II_SYS_VIS_LV3_BUBBLE 21000000, 0, 1);
	DropItem(II_SYS_VIS_LV3_IBLIS, 21000000, 0, 1);
	DropItem(II_SYS_VIS_LV3_SHADE, 21000000, 0, 1);

	DropItem(II_GEN_MAT_DIAMOND, 21000000, 0, 1);
	DropItem(II_GEN_MAT_DIAMOND, 21000000, 0, 1);
	DropItem(II_GEN_MAT_DIAMOND, 21000000, 0, 1);
	DropItem(II_GEN_MAT_DIAMOND, 21000000, 0, 1);
	DropItem(II_GEN_MAT_DIAMOND, 21000000, 0, 1);
	DropItem(II_GEN_MAT_EMERALD, 27000000, 0, 1);
	DropItem(II_GEN_MAT_EMERALD, 27000000, 0, 1);
	DropItem(II_GEN_MAT_EMERALD, 27000000, 0, 1);
	DropItem(II_GEN_MAT_EMERALD, 27000000, 0, 1);
	DropItem(II_GEN_MAT_EMERALD, 27000000, 0, 1);
	DropItem(II_GEN_MAT_SAPPHIRE, 36000000, 0, 1);
	DropItem(II_GEN_MAT_SAPPHIRE, 36000000, 0, 1);
	DropItem(II_GEN_MAT_SAPPHIRE, 36000000, 0, 1);
	DropItem(II_GEN_MAT_SAPPHIRE, 36000000, 0, 1);
	DropItem(II_GEN_MAT_SAPPHIRE, 36000000, 0, 1);
	DropItem(II_GEN_MAT_RUBY, 48000000, 0, 1);
	DropItem(II_GEN_MAT_RUBY, 48000000, 0, 1);
	DropItem(II_GEN_MAT_RUBY, 48000000, 0, 1);
	DropItem(II_GEN_MAT_RUBY, 48000000, 0, 1);
	DropItem(II_GEN_MAT_RUBY, 48000000, 0, 1);
	DropItem(II_GEN_MAT_TOPAZ, 63000000, 0, 1);
	DropItem(II_GEN_MAT_TOPAZ, 63000000, 0, 1);
	DropItem(II_GEN_MAT_TOPAZ, 63000000, 0, 1);
	DropItem(II_GEN_MAT_TOPAZ, 63000000, 0, 1);
	DropItem(II_GEN_MAT_TOPAZ, 63000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 180000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 180000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 180000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 180000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 180000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 180000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 180000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 180000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 180000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 180000000, 0, 1);

        DropItem(II_GEN_JEW_RIN_INTRING, 6000000, 18, 1);
	DropItem(II_GEN_JEW_RIN_DEXRING, 6000000, 18, 1);
	DropItem(II_GEN_JEW_RIN_STRRING, 6000000, 18, 1);

	DropItem(II_GEN_MAT_ELE_CANDLEA, 6000000, 0, 1);
	DropItem(II_GEN_MAT_ELE_RAINATKA, 6000000, 0, 1);
	DropItem(II_GEN_MAT_ELE_SPARKATKA, 6000000, 0, 1);
	DropItem(II_GEN_MAT_ELE_BREEZEATKA, 6000000, 0, 1);
	DropItem(II_GEN_MAT_ELE_SANDATKA, 6000000, 0, 1);

	DropItem(II_GEN_MAT_ELE_LIGHTING, 30000000, 0, 1);
	DropItem(II_GEN_MAT_ELE_VOLCANO, 30000000, 0, 1);
	DropItem(II_GEN_MAT_ELE_EARTHQUAKE, 30000000, 0, 1);
	DropItem(II_GEN_MAT_ELE_OCEAN, 30000000, 0, 1);
	DropItem(II_GEN_MAT_ELE_VACCUM, 30000000, 0, 1);

	DropItem(II_GEN_GEM_GEM_DEVILPIECE, 200000000, 0, 1);
	
	
	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan
                    }
		#battle
		    {
			Attack 20 cunning sam
                        Rangeattack 10
			Berserk 20 2.0
                    }
		#move
		    {
			
		    }	
   	}                
}

MI_DREADSTONE01
{
	AI
	{
		#Scan
                    {
                    }
		#battle
		    {
			Summon	20	2	MI_SKELGRIFFIN
                    }
		#move
		    {
		    }	
   	}               
}

MI_DREADSTONE02
{
	AI
	{
		#Scan
                    {
                    }
		#battle
		    {
			Summon	20	2	MI_SKELLEADER
                    }
		#move
		    {
		    }	
   	}               
}

MI_DREADSTONE03
{
	AI
	{
		#Scan
                    {
                    }
		#battle
		    {
			Summon	20	2	MI_SKELSPAIN
                    }
		#move
		    {
		    }	
   	}               
}

MI_DREADSTONE04
{
	AI
	{
		#Scan
                    {
                    }
		#battle
		    {
			Summon	20	2	MI_SKELSHAMEN
                    }
		#move
		    {
		    }	
   	}               
}

MI_DREADSTONE05
{
	AI
	{
		#Scan
                    {
                    }
		#battle
		    {
			Summon	20	2	MI_SKELRIDER
                    }
		#move
		    {
		    }	
   	}               
}

MI_DREADSTONE06
{
	AI
	{
		#Scan
                    {
                    }
		#battle
		    {
			Summon	20	2	MI_SKELRIDER
                    }
		#move
		    {
		    }	
   	}               
}

MI_RUSTIACRASHGATE01
{
	AI
	{
		#Scan
                    {
		    }
		#battle
		    {
			Attack 10 cunning sam
			Berserk 20 2.0
			rangeattack 6
                    }
		#move
		    {
		    }	
   	}                
}

MI_RUSTIACRASHGATE02
{
	AI
	{
		#Scan
                    {
		    }
		#battle
		    {
			Attack 10 cunning sam
			Berserk 20 2.0
			rangeattack 6
                    }
		#move
		    {
		    }	
   	}                
}

MI_RUSTIACRASHGATE03
{
	AI
	{
		#Scan
                    {
		    }
		#battle
		    {
			Attack 10 cunning sam
			Berserk 20 2.0
			rangeattack 6
                    }
		#move
		    {
		    }	
   	}                
}

MI_RUSTIACRASHGATE04
{
	AI
	{
		#Scan
                    {
		    }
		#battle
		    {
			Attack 10 cunning sam
			Berserk 20 2.0
			rangeattack 6
                    }
		#move
		    {
		    }	
   	}                
}





MI_BIGCOBRA01
{
	Maxitem = 2;
	DropGold(82, 119);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);

	DropItem(II_GEN_GEM_GEM_POISONTOOTH, 200000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan 
                    }
		#battle
		    {
			Attack cunning low
                               
                    }
		#move
		    {
			Loot d 5
		    }	
   	}               
}

MI_BIGVARIETYCOBRA01
{
	Maxitem = 2;
	DropGold(82, 119);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	

	DropItem(II_GEN_GEM_GEM_COBRASCALE, 200000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan 
                    }
		#battle
		    {
			Attack cunning low
                               
                    }
		#move
		    {
			Loot d 5
		    }	
   	}               
}

MI_BIGRACCOON01
{
	Maxitem = 2;
	DropGold(82, 119);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	

	DropItem(II_GEN_GEM_GEM_SOFTFUR, 200000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan 
                    }
		#battle
		    {
			Attack cunning low
                               
                    }
		#move
		    {
			Loot d 5
		    }	
   	}               
}

MI_BIGSOLDIERRACCOON01
{
	Maxitem = 2;
	DropGold(82, 119);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	

	DropItem(II_GEN_GEM_GEM_TWOHANDBLADE, 200000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan 
                    }
		#battle
		    {
			Attack cunning low
                               
                    }
		#move
		    {
			Loot d 5
		    }	
   	}               
}

MI_SOLDIERTANGZ01
{
	Maxitem = 2;
	DropGold(82, 119);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	

	DropItem(II_GEN_GEM_GEM_BRACELET, 200000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan 
                    }
		#battle
		    {
			Attack cunning low
                               
                    }
		#move
		    {
			Loot d 5
		    }	
   	}               
}

MI_SHAMANWUTANGKA01
{
	Maxitem = 2;
	DropGold(82, 119);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	

	DropItem(II_GEN_GEM_GEM_LUSIKAMASK, 200000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan 
                    }
		#battle
		    {
			Attack cunning low
                               
                    }
		#move
		    {
			Loot d 5
		    }	
   	}               
}

MI_BESIBIGFOOT01
{
	Maxitem = 1;

	DropItem(II_GEN_MAT_ORICHALCUM01, 180000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 180000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 180000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 180000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 180000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 180000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 180000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 180000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 180000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 180000000, 0, 1);

	DropItem(II_WEA_SWO_LUZA, 90000000, 0, 1);
	DropItem(II_WEA_SWT_LUZA, 90000000, 0, 1);
	DropItem(II_WEA_AXE_LUZA, 90000000, 0, 1);
	DropItem(II_WEA_AXT_LUZA, 90000000, 0, 1);
	DropItem(II_WEA_KNU_LUZA, 90000000, 0, 1);
	DropItem(II_WEA_CHE_LUZA, 90000000, 0, 1);
	DropItem(II_WEA_WAN_LUZA, 90000000, 0, 1);
	DropItem(II_WEA_STA_LUZA, 90000000, 0, 1);
	DropItem(II_WEA_BOW_LUZA, 90000000, 0, 1);
	DropItem(II_WEA_YOY_LUZA, 90000000, 0, 1);
	

	DropItem(II_GEN_GEM_GEM_BIGFOOTHEART, 200000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan 
                    }
		#battle
		    {
			Attack cunning low
                               
                    }
		#move
		    {
			Loot d 5
		    }	
   	}               
}

MI_BIGCOBRA02
{
	Maxitem = 2;
	DropGold(82, 119);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	

	DropItem(II_GEN_GEM_GEM_LIGHTPOISONTOOTH, 200000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan 
                    }
		#battle
		    {
			Attack cunning low
                               
                    }
		#move
		    {
			Loot d 5
		    }	
   	}               
}

MI_BIGVARIETYCOBRA02
{
	Maxitem = 2;
	DropGold(82, 119);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	

	DropItem(II_GEN_GEM_GEM_LIGHTCOBRASCALE, 200000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan 
                    }
		#battle
		    {
			Attack cunning low
                               
                    }
		#move
		    {
			Loot d 5
		    }	
   	}               
}

MI_BIGRACCOON02
{
	Maxitem = 2;
	DropGold(82, 119);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	

	DropItem(II_GEN_GEM_GEM_LIGHTSOFTFUR, 200000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan 
                    }
		#battle
		    {
			Attack cunning low
                               
                    }
		#move
		    {
			Loot d 5
		    }	
   	}               
}

MI_BIGSOLDIERRACCOON02
{
	Maxitem = 2;
	DropGold(82, 119);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	

	DropItem(II_GEN_GEM_GEM_LIGHTTWOHANDBLADE, 200000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan 
                    }
		#battle
		    {
			Attack cunning low
                               
                    }
		#move
		    {
			Loot d 5
		    }	
   	}               
}

MI_SOLDIERTANGZ02
{
	Maxitem = 2;
	DropGold(82, 119);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	

	DropItem(II_GEN_GEM_GEM_LIGHTBRACELET, 200000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan 
                    }
		#battle
		    {
			Attack cunning low
                               
                    }
		#move
		    {
			Loot d 5
		    }	
   	}               
}

MI_SHAMANWUTANGKA02
{
	Maxitem = 2;
	DropGold(82, 119);
	DropKind(IK3_SWD, 6, 6);
	DropKind(IK3_AXE, 6, 6);
	DropKind(IK3_CHEERSTICK, 6, 6);
	DropKind(IK3_KNUCKLEHAMMER, 6, 6);
	DropKind(IK3_WAND, 6, 6);
	DropKind(IK3_STAFF, 6, 6);
	DropKind(IK3_HELMET, 6, 6);
	DropKind(IK3_SUIT, 6, 6);
	DropKind(IK3_GAUNTLET, 6, 6);
	DropKind(IK3_BOOTS, 6, 6);
	DropKind(IK3_SHIELD, 6, 6);
	DropKind(IK3_BOW, 6, 6);
	DropKind(IK3_YOYO, 6, 6);
	

	DropItem(II_GEN_GEM_GEM_LIGHTLUSIKAMASK, 200000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan 
                    }
		#battle
		    {
			Attack cunning low
                               
                    }
		#move
		    {
			Loot d 5
		    }	
   	}               
}

MI_BESIBIGFOOT02
{
	Maxitem = 4;

	DropItem(II_GEN_MAT_DIAMOND, 21000000, 0, 1);
	DropItem(II_GEN_MAT_DIAMOND, 21000000, 0, 1);
	DropItem(II_GEN_MAT_DIAMOND, 21000000, 0, 1);
	DropItem(II_GEN_MAT_DIAMOND, 21000000, 0, 1);
	DropItem(II_GEN_MAT_DIAMOND, 21000000, 0, 1);
	DropItem(II_GEN_MAT_EMERALD, 27000000, 0, 1);
	DropItem(II_GEN_MAT_EMERALD, 27000000, 0, 1);
	DropItem(II_GEN_MAT_EMERALD, 27000000, 0, 1);
	DropItem(II_GEN_MAT_EMERALD, 27000000, 0, 1);
	DropItem(II_GEN_MAT_EMERALD, 27000000, 0, 1);
	DropItem(II_GEN_MAT_SAPPHIRE, 36000000, 0, 1);
	DropItem(II_GEN_MAT_SAPPHIRE, 36000000, 0, 1);
	DropItem(II_GEN_MAT_SAPPHIRE, 36000000, 0, 1);
	DropItem(II_GEN_MAT_SAPPHIRE, 36000000, 0, 1);
	DropItem(II_GEN_MAT_SAPPHIRE, 36000000, 0, 1);
	DropItem(II_GEN_MAT_RUBY, 48000000, 0, 1);
	DropItem(II_GEN_MAT_RUBY, 48000000, 0, 1);
	DropItem(II_GEN_MAT_RUBY, 48000000, 0, 1);
	DropItem(II_GEN_MAT_RUBY, 48000000, 0, 1);
	DropItem(II_GEN_MAT_RUBY, 48000000, 0, 1);
	DropItem(II_GEN_MAT_TOPAZ, 63000000, 0, 1);
	DropItem(II_GEN_MAT_TOPAZ, 63000000, 0, 1);
	DropItem(II_GEN_MAT_TOPAZ, 63000000, 0, 1);
	DropItem(II_GEN_MAT_TOPAZ, 63000000, 0, 1);
	DropItem(II_GEN_MAT_TOPAZ, 63000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 180000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 180000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 180000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 180000000, 0, 1);
	DropItem(II_GEN_MAT_ORICHALCUM01, 180000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 180000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 180000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 180000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 180000000, 0, 1);
	DropItem(II_GEN_MAT_MOONSTONE, 180000000, 0, 1);

	DropItem(II_GEN_JEW_RIN_FIRERING, 9000000, 0, 1)
	DropItem(II_GEN_JEW_RIN_LANDRING, 9000000, 0, 1)
	DropItem(II_GEN_JEW_RIN_WATERRING, 9000000, 0, 1)
	DropItem(II_GEN_JEW_RIN_ELECTRICRING, 9000000, 0, 1)
	DropItem(II_GEN_JEW_EAR_ATTEARRINGEST, 9000000, 0, 1)
	DropItem(II_GEN_JEW_EAR_DEFEARRINGEST, 9000000, 0, 1)
	DropItem(II_GEN_JEW_NEC_HPNECKLACEMR, 9000000, 0, 1)
	DropItem(II_GEN_JEW_NEC_MPNECKLACEMR, 9000000, 0, 1)
	DropItem(II_GEN_JEW_NEC_FPNECKLACEMR, 9000000, 0, 1)
	DropItem(II_GEN_JEW_NEC_HPMPNECKLACE, 9000000, 0, 1)
	DropItem(II_GEN_JEW_EAR_MAGICRINGEST, 9000000, 0, 1)
	DropItem(II_GEN_JEW_EAR_RANGERINGEST, 9000000, 0, 1)

	DropItem(II_WEA_SWO_LUZAM, 3000000, 0, 1);
	DropItem(II_WEA_SWT_LUZAM, 3000000, 0, 1);
	DropItem(II_WEA_AXE_LUZAM, 3000000, 0, 1);
	DropItem(II_WEA_AXT_LUZAM, 3000000, 0, 1);
	DropItem(II_WEA_KNU_LUZAM, 3000000, 0, 1);
	DropItem(II_WEA_CHE_LUZAM, 3000000, 0, 1);
	DropItem(II_WEA_WAN_LUZAM, 3000000, 0, 1);
	DropItem(II_WEA_STA_LUZAM, 3000000, 0, 1);
	DropItem(II_WEA_BOW_LUZAM, 3000000, 0, 1);
	DropItem(II_WEA_YOY_LUZAM, 3000000, 0, 1);
	

	DropItem(II_GEN_GEM_GEM_LIGHTBIGFOOTHEART, 200000000, 0, 1);

	m_nAttackFirstRange = 8;

	AI
	{
		#Scan
                    {
			scan 
                    }
		#battle
		    {
			Attack cunning low
                               
                    }
		#move
		    {
			Loot d 5
		    }	
   	}               
}


//�� ���ϴ� ������� ����. �߰� �۾��� �ٷ� ������ ����..
MI_PUKEPUKE5
{
	Maxitem = 2;

	m_nAttackFirstRange = 8;
}

MI_BANG5
{
	Maxitem = 2;

	m_nAttackFirstRange = 8;
}

MI_ROCKMUSCLE5
{
	Maxitem = 2;

	m_nAttackFirstRange = 8;
}

MI_MRPUMPKIN5
{
	Maxitem = 2;

	m_nAttackFirstRange = 8;
}

MI_MAFL_PATROL
{
	
	m_nAttackFirstRange = 10;

	AI
	{
		#Scan
                    {
			scan range 10 chao 100
                    }

		#battle
		    {
			attack
			Helper sam 5000 1
			Rangeattack 10              
                    }

		#move
		    {
			
		    }	
   	}   
}