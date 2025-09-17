QUEST_LEGENDREDMANTIS2 = {
	title = 'IDS_PROPQUEST_INC_001142',
	character = 'MaSa_Helgar',
	end_character = 'MaSa_Helgar',
	start_requirements = {
		min_level = 60,
		max_level = 80,
		job = { 'JOB_VAGRANT', 'JOB_MERCENARY', 'JOB_ACROBAT', 'JOB_ASSIST', 'JOB_MAGICIAN', 'JOB_KNIGHT', 'JOB_BLADE', 'JOB_JESTER', 'JOB_RANGER', 'JOB_RINGMASTER', 'JOB_BILLPOSTER', 'JOB_PSYCHIKEEPER', 'JOB_ELEMENTOR', 'JOB_KNIGHT_MASTER', 'JOB_BLADE_MASTER', 'JOB_JESTER_MASTER', 'JOB_RANGER_MASTER', 'JOB_RINGMASTER_MASTER', 'JOB_BILLPOSTER_MASTER', 'JOB_PSYCHIKEEPER_MASTER', 'JOB_ELEMENTOR_MASTER', 'JOB_KNIGHT_HERO', 'JOB_BLADE_HERO', 'JOB_JESTER_HERO', 'JOB_RANGER_HERO', 'JOB_RINGMASTER_HERO', 'JOB_BILLPOSTER_HERO', 'JOB_PSYCHIKEEPER_HERO', 'JOB_ELEMENTOR_HERO' },
		previous_quest = 'QUEST_LEGENDREDMANTIS1',
	},
	rewards = {
		gold = 0,
		exp = 3386828,
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_QUE_REDYSPAWN', quantity = 15, sex = 'Any', remove = true },
		},
		monsters = {
			{ id = 'MI_REDMANTIS1', quantity = 10 },
		},
	},
	drops = {
		{ item_id = 'II_SYS_SYS_QUE_REDYSPAWN', monster_id = 'MI_REDMANTIS1', probability = '1500000000' },
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_001143',
			'IDS_PROPQUEST_INC_001144',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_001145',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_001146',
		},
		completed = {
			'IDS_PROPQUEST_INC_001147',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_001148',
		},
	}
}
