QUEST_EVE_LOSTXMAS1 = {
	title = 'IDS_PROPQUEST_INC_001250',
	character = 'MaFl_Buruto',
	end_character = '',
	start_requirements = {
		min_level = 1,
		max_level = 129,
		job = { 'JOB_VAGRANT', 'JOB_MERCENARY', 'JOB_ACROBAT', 'JOB_ASSIST', 'JOB_MAGICIAN', 'JOB_KNIGHT', 'JOB_BLADE', 'JOB_JESTER', 'JOB_RANGER', 'JOB_RINGMASTER', 'JOB_BILLPOSTER', 'JOB_PSYCHIKEEPER', 'JOB_ELEMENTOR' },
		previous_quest = '',
	},
	rewards = {
		gold = 0,
		exp = 0,
		items = {
			{ id = 'II_SYS_SYS_GEM_BLUEGBOX', quantity = 1, sex = 'Any' },
		},
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_GEM_REDSOCKS', quantity = 500, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_001251',
			'IDS_PROPQUEST_INC_001252',
			'IDS_PROPQUEST_INC_001253',
			'IDS_PROPQUEST_INC_001254',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_001255',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_001256',
		},
		completed = {
			'IDS_PROPQUEST_INC_001257',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_001258',
		},
	}
}
