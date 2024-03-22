QUEST_COOK01 = {
	title = 'IDS_PROPQUEST_INC_002387',
	character = 'MaFl_Cook01',
	end_character = '',
	start_requirements = {
		min_level = 1,
		max_level = 129,
		job = { 'JOB_VAGRANT', 'JOB_MERCENARY', 'JOB_ACROBAT', 'JOB_ASSIST', 'JOB_MAGICIAN', 'JOB_KNIGHT', 'JOB_BLADE', 'JOB_JESTER', 'JOB_RANGER', 'JOB_RINGMASTER', 'JOB_BILLPOSTER', 'JOB_PSYCHIKEEPER', 'JOB_ELEMENTOR', 'JOB_KNIGHT_MASTER', 'JOB_BLADE_MASTER', 'JOB_JESTER_MASTER', 'JOB_RANGER_MASTER', 'JOB_RINGMASTER_MASTER', 'JOB_BILLPOSTER_MASTER', 'JOB_PSYCHIKEEPER_MASTER', 'JOB_ELEMENTOR_MASTER', 'JOB_KNIGHT_HERO', 'JOB_BLADE_HERO', 'JOB_JESTER_HERO', 'JOB_RANGER_HERO', 'JOB_RINGMASTER_HERO', 'JOB_BILLPOSTER_HERO', 'JOB_PSYCHIKEEPER_HERO', 'JOB_ELEMENTOR_HERO' },
		previous_quest = '',
	},
	rewards = {
		gold = 0,
		exp = 0,
		items = {
			{ id = 'II_SYS_SYS_EVE_BXCOOKING01', quantity = 1, sex = 'Any' },
		},
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_EVE_SALT02', quantity = 10, sex = 'Any', remove = true },
			{ id = 'II_SYS_SYS_EVE_MEAT01', quantity = 10, sex = 'Any', remove = true },
			{ id = 'II_SYS_SYS_EVE_PUMPKIN01', quantity = 10, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_002388',
			'IDS_PROPQUEST_INC_002389',
			'IDS_PROPQUEST_INC_002390',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_002391',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_002392',
		},
		completed = {
			'IDS_PROPQUEST_INC_002393',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_002394',
		},
	}
}
