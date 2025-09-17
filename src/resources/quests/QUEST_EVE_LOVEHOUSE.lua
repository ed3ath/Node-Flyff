QUEST_EVE_LOVEHOUSE = {
	title = 'IDS_PROPQUEST_INC_001294',
	character = 'MaFl_Nina',
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
			{ id = 'II_SYS_SYS_GEM_LUXUBOX', quantity = 1, sex = 'Any' },
		},
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_GEM_DRYNRT', quantity = 1000, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_001295',
			'IDS_PROPQUEST_INC_001296',
			'IDS_PROPQUEST_INC_001297',
			'IDS_PROPQUEST_INC_001298',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_001299',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_001300',
		},
		completed = {
			'IDS_PROPQUEST_INC_001301',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_001302',
		},
	}
}
