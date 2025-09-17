QUEST_EVE_GBRCSOUP = {
	title = 'IDS_PROPQUEST_INC_001283',
	character = 'MaFl_Juglin',
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
			{ id = 'II_SYS_SYS_GEM_LUCKBAG', quantity = 1, sex = 'Any' },
		},
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_GEM_RCSOUP', quantity = 100, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_001284',
			'IDS_PROPQUEST_INC_001285',
			'IDS_PROPQUEST_INC_001286',
			'IDS_PROPQUEST_INC_001287',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_001288',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_001289',
		},
		completed = {
			'IDS_PROPQUEST_INC_001290',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_001291',
		},
	}
}
