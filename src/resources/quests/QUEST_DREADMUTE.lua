QUEST_DREADMUTE = {
	title = 'IDS_PROPQUEST_INC_001236',
	character = 'MaFl_Gergantes',
	end_character = 'MaFl_Gergantes',
	start_requirements = {
		min_level = 40,
		max_level = 50,
		job = { 'JOB_MERCENARY', 'JOB_ACROBAT', 'JOB_ASSIST', 'JOB_MAGICIAN', 'JOB_KNIGHT', 'JOB_BLADE', 'JOB_JESTER', 'JOB_RANGER', 'JOB_RINGMASTER', 'JOB_BILLPOSTER', 'JOB_PSYCHIKEEPER', 'JOB_ELEMENTOR' },
		previous_quest = '',
	},
	rewards = {
		gold = 0,
		exp = 0,
		items = {
			{ id = 'II_SYS_SYS_QUE_HRTARVAN', quantity = 1, sex = 'Any' },
		},
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_QUE_BKDREAD3', quantity = 1, sex = 'Any', remove = true },
			{ id = 'II_SYS_SYS_QUE_MAPDREAD3', quantity = 1, sex = 'Any', remove = true },
		},
		monsters = {
			{ id = 'MI_HADESEOR', quantity = 1 },
		},
	},
	drops = {
		{ item_id = 'II_SYS_SYS_QUE_BKDREAD3', monster_id = 'MI_HADESEOR', probability = '1000000000' },
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_001237',
			'IDS_PROPQUEST_INC_001238',
			'IDS_PROPQUEST_INC_001239',
			'IDS_PROPQUEST_INC_001240',
			'IDS_PROPQUEST_INC_001241',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_001242',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_001243',
		},
		completed = {
			'IDS_PROPQUEST_INC_001244',
			'IDS_PROPQUEST_INC_001245',
			'IDS_PROPQUEST_INC_001246',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_001247',
		},
	}
}
