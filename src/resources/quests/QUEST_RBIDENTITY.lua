QUEST_RBIDENTITY = {
	title = 'IDS_PROPQUEST_INC_001075',
	character = 'MaFl_Luda',
	end_character = 'MaFl_Luda',
	start_requirements = {
		min_level = 30,
		max_level = 60,
		job = { 'JOB_MERCENARY', 'JOB_ACROBAT', 'JOB_ASSIST', 'JOB_MAGICIAN', 'JOB_KNIGHT', 'JOB_BLADE', 'JOB_JESTER', 'JOB_RANGER', 'JOB_RINGMASTER', 'JOB_BILLPOSTER', 'JOB_PSYCHIKEEPER', 'JOB_ELEMENTOR', 'JOB_KNIGHT_MASTER', 'JOB_BLADE_MASTER', 'JOB_JESTER_MASTER', 'JOB_RANGER_MASTER', 'JOB_RINGMASTER_MASTER', 'JOB_BILLPOSTER_MASTER', 'JOB_PSYCHIKEEPER_MASTER', 'JOB_ELEMENTOR_MASTER', 'JOB_KNIGHT_HERO', 'JOB_BLADE_HERO', 'JOB_JESTER_HERO', 'JOB_RANGER_HERO', 'JOB_RINGMASTER_HERO', 'JOB_BILLPOSTER_HERO', 'JOB_PSYCHIKEEPER_HERO', 'JOB_ELEMENTOR_HERO' },
		previous_quest = 'QUEST_REVENGE_RBANG',
	},
	rewards = {
		gold = 357000,
		exp = 17446,
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_QUE_RBSYMBOL', quantity = 7, sex = 'Any', remove = true },
		},
		monsters = {
			{ id = 'MI_RBANG1', quantity = 5 },
			{ id = 'MI_RBANG2', quantity = 1 },
		},
	},
	drops = {
		{ item_id = 'II_SYS_SYS_QUE_RBSYMBOL', monster_id = 'MI_RBANG1', probability = '500000000' },
		{ item_id = 'II_SYS_SYS_QUE_RBSYMBOL', monster_id = 'MI_RBANG2', probability = '1000000000' },
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_001076',
			'IDS_PROPQUEST_INC_001077',
			'IDS_PROPQUEST_INC_001078',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_001079',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_001080',
		},
		completed = {
			'IDS_PROPQUEST_INC_001081',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_001082',
		},
	}
}
