QUEST_EVE_LOSTXMAS2 = {
	title = 'IDS_PROPQUEST_INC_001261',
	character = 'MaFl_Aramy',
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
			{ id = 'II_SYS_SYS_GEM_REDGBOX', quantity = 1, sex = 'Any' },
		},
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_GEM_REDSOCKS', quantity = 300, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_001262',
			'IDS_PROPQUEST_INC_001263',
			'IDS_PROPQUEST_INC_001264',
			'IDS_PROPQUEST_INC_001265',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_001266',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_001267',
		},
		completed = {
			'IDS_PROPQUEST_INC_001268',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_001269',
		},
	}
}
