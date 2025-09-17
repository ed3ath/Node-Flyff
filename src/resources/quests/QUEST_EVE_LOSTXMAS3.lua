QUEST_EVE_LOSTXMAS3 = {
	title = 'IDS_PROPQUEST_INC_001272',
	character = 'MaFl_Atto',
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
			{ id = 'II_SYS_SYS_GEM_YELLOWGBOX', quantity = 1, sex = 'Any' },
		},
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_GEM_REDSOCKS', quantity = 100, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_001273',
			'IDS_PROPQUEST_INC_001274',
			'IDS_PROPQUEST_INC_001275',
			'IDS_PROPQUEST_INC_001276',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_001277',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_001278',
		},
		completed = {
			'IDS_PROPQUEST_INC_001279',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_001280',
		},
	}
}
