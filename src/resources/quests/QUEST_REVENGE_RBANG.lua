QUEST_REVENGE_RBANG = {
	title = 'IDS_PROPQUEST_INC_001061',
	character = 'MaFl_Luda',
	end_character = 'MaFl_Luda',
	start_requirements = {
		min_level = 30,
		max_level = 60,
		job = { 'JOB_MERCENARY', 'JOB_ACROBAT', 'JOB_ASSIST', 'JOB_MAGICIAN', 'JOB_KNIGHT', 'JOB_BLADE', 'JOB_JESTER', 'JOB_RANGER', 'JOB_RINGMASTER', 'JOB_BILLPOSTER', 'JOB_PSYCHIKEEPER', 'JOB_ELEMENTOR', 'JOB_KNIGHT_MASTER', 'JOB_BLADE_MASTER', 'JOB_JESTER_MASTER', 'JOB_RANGER_MASTER', 'JOB_RINGMASTER_MASTER', 'JOB_BILLPOSTER_MASTER', 'JOB_PSYCHIKEEPER_MASTER', 'JOB_ELEMENTOR_MASTER', 'JOB_KNIGHT_HERO', 'JOB_BLADE_HERO', 'JOB_JESTER_HERO', 'JOB_RANGER_HERO', 'JOB_RINGMASTER_HERO', 'JOB_BILLPOSTER_HERO', 'JOB_PSYCHIKEEPER_HERO', 'JOB_ELEMENTOR_HERO' },
		previous_quest = 'QUEST_GETBACK_LUDASAFE',
	},
	rewards = {
		gold = 0,
		exp = 0,
		items = {
			{ id = 'II_WEA_SWO_ENTANALE', quantity = 1, sex = 'Any' },
		},
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_QUE_ENTANALE', quantity = 1, sex = 'Any', remove = true },
		},
		monsters = {
			{ id = 'MI_RBANG2', quantity = 1 },
		},
	},
	drops = {
		{ item_id = 'II_SYS_SYS_QUE_ENTANALE', monster_id = 'MI_RBANG2', probability = '900000000' },
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_001062',
			'IDS_PROPQUEST_INC_001063',
			'IDS_PROPQUEST_INC_001064',
			'IDS_PROPQUEST_INC_001065',
			'IDS_PROPQUEST_INC_001066',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_001067',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_001068',
		},
		completed = {
			'IDS_PROPQUEST_INC_001069',
			'IDS_PROPQUEST_INC_001070',
			'IDS_PROPQUEST_INC_001071',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_001072',
		},
	}
}
