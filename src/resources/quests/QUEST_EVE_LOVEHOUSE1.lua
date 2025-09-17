QUEST_EVE_LOVEHOUSE1 = {
	title = 'IDS_PROPQUEST_INC_001305',
	character = 'MaFl_ChiChi',
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
			{ id = 'II_SYS_SYS_GEM_SPECBOX', quantity = 1, sex = 'Any' },
		},
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_GEM_DRYNRT', quantity = 600, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_001306',
			'IDS_PROPQUEST_INC_001307',
			'IDS_PROPQUEST_INC_001308',
			'IDS_PROPQUEST_INC_001309',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_001310',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_001311',
		},
		completed = {
			'IDS_PROPQUEST_INC_001312',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_001313',
		},
	}
}
